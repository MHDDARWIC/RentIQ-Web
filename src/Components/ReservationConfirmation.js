import styles from '../Style-Modules/ReservationConfirmation.module.css';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/rentiq.png';
import divider from '../assets/dividervertical.png';

function ReservationConfirmation(){
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [tempReserver, setTempReserver] = useState("");
    const [tempKey, setTempKey] = useState("");
    const [reservationDays, setReservationDays] = useState(0);
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
                setTempReserver(documents[j].value.tempReserver);
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
        var date1 = new Date(tempReserver.reserverPickupDate);
        var date2 = new Date(tempReserver.reserverReturnDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setReservationDays(diffDays);
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
            "isRented": false,
            "isReserved": true,
            "needMaintenance": false,
            "maintenanceType": "",
            "currentRenterName": "",
            "currentReserverName": tempReserver.customerName,
            "currentRenterDL": "",
            "currentRenterPhone": "",
            "currentReserverPhone": tempReserver.customerPhone,
            "currentRenterEmail": "",
            "currentReserverEmail": tempReserver.customerEmail,
            "currentRenterDOB": "",
            "mileage": currentCar.mileage,
            "rate": currentCar.rate,
            "color": currentCar.color,
            "lastRented": "",
            "renterPickupDate": "",
            "renterPickupTime": "",
            "renterReturnDate": "",
            "renterReturnTime": "",
            "reserverPickupDate": tempReserver.reserverPickupDate,
            "reserverPickupTime": tempReserver.reserverPickupTime,
            "reserverReturnDate": tempReserver.reserverReturnDate,
            "reserverReturnTime": tempReserver.reserverReturnTime,
            "belongsTo": currentUser.email,
            "extraNotes": "",
            "rentalDays": reservationDays,
            "totalPrice": total,
            "rentalTimes": currentCar.rentalTimes,
            "available":true
        }

        let earning={
            "date":todayDate,
            "action":"reserved",
            "carMake": currentCar.carMake,
            "carYear": currentCar.carYear,
            "carModel": currentCar.carModel,
            "customer":tempReserver.customerName,
            "totalEarned":total
        }

        cars[tempKey] = car;
        earnings.push(earning);

        //update the car at tempKey
        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                cars: cars,
                tempKey: -1,
                tempReserver: {},
                earnings:earnings
            })
            .then(function () {
                console.log("Rental Success");
                history.push('/reservation-success');

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
                <p className={styles.titleStyle}>Finalize Reservation</p>
            </div>

            <div className={styles.confirm}>
                <div className={styles.carInfo}>
                    <img src={cars[tempKey].carImg} className={styles.carImg} />
                    <p className={styles.cardata} style={{ fontSize: "50px"}}>{cars[tempKey].carMake} {cars[tempKey].carModel} {cars[tempKey].carYear} </p>
                    <p className={styles.cardata}>{cars[tempKey].mileage} Miles</p>
                    <p className={styles.cardata}>Rate: ${cars[tempKey].rate}/day</p>
                </div>

                <div className={styles.divider}>
                    <img src={divider} alt="divider" className={styles.divider}/>
                </div>

                <div className={styles.rentalInfo}>
                    <p className={styles.daysData}>Rental Days: {reservationDays} </p>
                    <p className={styles.priceData}>Total: ${total}</p>
                    <p className={styles.renterdata}>Renter: {tempReserver.customerName} </p>
                    <p className={styles.renterdata}>From: {tempReserver.reserverPickupDate} to: {tempReserver.reserverReturnDate} </p>
                    <button className={styles.button} onClick={handleSubmit}>Confirm Reservation</button>
                </div>
            </div>
        </div>

    )
}

export default ReservationConfirmation;