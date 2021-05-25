import styles from '../../Style-Modules/ManageRentalsStyles/ExtendRental.module.css';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/rentiq.png';
import divider from '../../assets/dividervertical.png';

function ExtendRental() {
    const [newDate, setNewDate] = useState(new Date());
    const [oldDate, setOldDate] = useState();
    const [newTotal, setNewTotal] = useState(0);
    const [rentalDays, setRentalDays] = useState(0);

    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [tempKey, setTempKey] = useState("");
    const [currentCar, setCurrentCar] = useState();

    const db = firebase.firestore();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setLoading(false);
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                setTempKey(documents[j].value.tempKey);
                setCurrentCar(cars[tempKey]);
                if (currentCar == undefined) {
                    console.log("still undefined");
                    setLoading(true);
                } else {
                    setLoading(false);
                    setOldDate(cars[tempKey].renterReturnDate);
                    break;
                }

            } else {
                setLoading(true);
            }
        }
    });

    function handleNewPrice(da) {
        var date1 = new Date(da);
        var date2 = new Date(oldDate);
        setNewDate(da);
        const diffTime = Math.abs(date1 - date2);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setRentalDays(diffDays);
        setNewTotal(diffDays * currentCar.rate);
        console.log(rentalDays);
        console.log(newTotal);

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
            "needMaintenance": currentCar.needMaintenance,
            "maintenanceType": currentCar.maintenanceType,
            "currentRenterName": currentCar.currentRenterName,
            "currentReserverName": currentCar.currentReserverName,
            "currentRenterDL": currentCar.currentRenterDL,
            "currentRenterPhone": currentCar.currentRenterPhone,
            "currentReserverPhone": currentCar.currentReserverPhone,
            "currentRenterEmail": currentCar.currentRenterEmail,
            "currentReserverEmail": currentCar.currentReserverEmail,
            "currentRenterDOB": currentCar.currentRenterDOB,
            "mileage": currentCar.mileage,
            "rate": currentCar.rate,
            "color": currentCar.color,
            "lastRented": currentCar.lastRented,
            "renterPickupDate": currentCar.renterPickupDate,
            "renterPickupTime": currentCar.renterPickupTime,
            "renterReturnDate": newDate,
            "renterReturnTime": currentCar.renterReturnTime,
            "reserverPickupDate": currentCar.reserverPickupDate,
            "reserverPickupTime": currentCar.reserverPickupTime,
            "reserverReturnDate": currentCar.reserverReturnDate,
            "reserverReturnTime": currentCar.reserverReturnTime,
            "belongsTo": currentUser.email,
            "extraNotes": currentCar.extraNotes,
            "rentalDays": rentalDays,
            "totalPrice": newTotal,
            "rentalTimes": currentCar.rentalTimes,
            "available": true,
        }

        //saved

        cars[tempKey] = car;

        //update the car at tempKey
        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                cars: cars,
                tempKey: -1,
            })
            .then(function () {
                console.log("Closed Rental Success");
                history.push('/extend-success');

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
                <img src={logo} alt="rentiq logo" className={styles.logoImg} />
            </div>

            <div className={styles.main}>
                <div className={styles.info}>
                    <div className={styles.carInfo}>
                        <img src={cars[tempKey].carImg} alt="the car logo" className={styles.carLogoImg} />
                        <p className={styles.rentInfo}>{cars[tempKey].carMake} {cars[tempKey].carModel} {cars[tempKey].carYear}</p>
                        <p className={styles.rentInfo}>Rented By: {cars[tempKey].currentRenterName}</p>
                        <p className={styles.rentInfo}>Rate: ${cars[tempKey].rate} /day</p>
                    </div>

                    <div className={styles.divider}>
                        <img src={divider} alt="a vertical divider" className={styles.dividerStyle} />
                    </div>

                    <div className={styles.priceInfo}>
                        <p className={styles.priceLabels}>Current Price:</p>
                        <p className={styles.prices} style={{color:'#ff40369f'}}>$ {cars[tempKey].totalPrice}</p>
                        <p className={styles.priceLabels}>New Price:</p>
                        <p className={styles.prices} style={{color:'#66ffa877'}}>$ {newTotal}</p>
                    </div>

                </div>

                <div className={styles.input}>
                    <label for="newDate" className={styles.labels}>New Returning Date: </label>
                    <input type="date" id="newDate" value={newDate} onChange={(e) => handleNewPrice(e.target.value)} className={styles.inputField} required />
                    <button className={styles.button} onClick={handleSubmit}>Extend Rental</button>
                </div>
            </div>
        </div>
    )
}

export default ExtendRental;