import styles from '../Style-Modules/RentConfirmation.module.css';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/rentiq.png';
import divider from '../assets/dividervertical.png';


function RentConfirmation() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [tempRenter, setTempRenter] = useState("");
    const [tempKey, setTempKey] = useState("");
    const [rentalDays, setRentalDays] = useState(0);
    const [total, setTotal] = useState(0);
    const [currentCar, setCurrentCar] = useState();

    const [earnings,setEarnings]=useState();

    const [today, setToday] = useState(new Date());
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    const [todayDate, setTodayDate] = useState(month + '/' + day + '/' + year);

    const db = firebase.firestore();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setLoading(false);
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                setTempRenter(documents[j].value.tempRenter);
                setTempKey(documents[j].value.tempKey);
                setCurrentCar(cars[tempKey]);
                setEarnings(documents[j].value.earnings)
                if (currentCar == undefined) {
                    console.log("still undefined");
                    setLoading(true);
                } else {
                    handleDate();
                    setLoading(false);
                    break;

                }

            } else {
                setLoading(true);
            }
        }
    })



    function handleDate() {
        var date1 = new Date(tempRenter.renterPickupDate);
        var date2 = new Date(tempRenter.renterReturnDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setRentalDays(diffDays);
        console.log(currentCar)
        setTotal(diffDays * currentCar.rate);
    }

    
    function handleSubmit(e) {
        e.preventDefault();
        let car = {
            "key": currentCar.key,
            "vin": currentCar.vin,
            "carMake": currentCar.carMake,
            "carYear": currentCar.carYear,
            "carModel": currentCar.carModel,
            "doors": currentCar.doors,
            "bodyClass": currentCar.bodyClass,
            'fuelTypePrimary': currentCar.fuelTypePrimary,
            'VehicleType': currentCar.VehicleType,
            "engineCylinders": currentCar.engineCylinders,
            "engineHP": currentCar.engineHP,
            "trim": currentCar.trim,
            "carImg": currentCar.carImg,
            "isRented": true,
            "isReserved": false,
            "needMaintenance": false,
            "maintenanceType": "",
            "currentRenterName": tempRenter.customerName,
            "currentReserverName": "",
            "currentRenterDL": tempRenter.renterDL,
            "currentRenterPhone": tempRenter.customerPhone,
            "currentReserverPhone": "",
            "currentRenterEmail": tempRenter.customerEmail,
            "currentReserverEmail": "",
            "currentRenterDOB": tempRenter.renterDOB,
            "mileage": currentCar.mileage,
            "rate": currentCar.rate,
            "color": currentCar.color,
            "lastRented": tempRenter.renterPickupDate,
            "renterPickupDate": tempRenter.renterPickupDate,
            "renterPickupTime": tempRenter.renterPickupTime,
            "renterReturnDate": tempRenter.renterReturnDate,
            "renterReturnTime": tempRenter.renterReturnTime,
            "reserverPickupDate": "",
            "reserverPickupTime": "",
            "reserverReturnDate": "",
            "reserverReturnTime": "",
            "belongsTo": currentUser.email,
            "extraNotes": tempRenter.extraNotes,
            "rentalDays": rentalDays,
            "totalPrice": total,
            "rentalTimes": currentCar.rentalTimes + 1,
            "available":true,
        }

        let earning={
            "date":todayDate,
            "action":"rented",
            "carMake": currentCar.carMake,
            "carYear": currentCar.carYear,
            "carModel": currentCar.carModel,
            "customer":tempRenter.customerName,
            "totalEarned":total
        }

        earnings.push(earning);

        cars[tempKey] = car;

        //update the car at tempKey
        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                cars: cars,
                tempKey: -1,
                tempRenter: {},
                earnings:earnings
            })
            .then(function () {
                console.log("Rental Success");
                history.push('/rent-success');

            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);

            });

    }

    return loading ? (
        <div>
            <p>Loading...</p>
        </div>

    ) : (
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
                <img src={logo} className={styles.logoImg} alt="rentiq logo" />
            </div>

            <div className={styles.confirm}>
                <div className={styles.carInfo}>
                    <img src={cars[tempKey].carImg} className={styles.carImg} />
                    <p className={styles.cardata} style={{ fontSize: "50px", marginTop: "-10%" }}>{cars[tempKey].carMake} {cars[tempKey].carModel} {cars[tempKey].carYear} </p>
                    <p className={styles.cardata}>{cars[tempKey].mileage} Miles</p>
                    <p className={styles.cardata}>Rate: ${cars[tempKey].rate}/day</p>
                </div>

                <div className={styles.divider}>
                    <img src={divider} alt="divider" className={styles.divider}/>

                </div>

                <div className={styles.rentalInfo}>
                    <p className={styles.daysData}>Rental Days: {rentalDays} </p>
                    <p className={styles.priceData}>Total: ${total}</p>
                    <p className={styles.renterdata}>Renter: {tempRenter.customerName} </p>
                    <p className={styles.renterdata}>{tempRenter.renterDL} </p>
                    <p className={styles.renterdata}>From: {tempRenter.renterPickupDate} to: {tempRenter.renterReturnDate} </p>
                    <button className={styles.button} onClick={handleSubmit}>Confirm and Rent</button>
                </div>
            </div>
        </div>

    )

}

export default RentConfirmation;