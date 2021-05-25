import styles from '../../Style-Modules/ManageInventoryStyles/AddMaintenance.module.css';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/rentiq.png';
import divider from '../../assets/divider.png';
import ReservationConfirmation from '../ReservationConfirmation';

function AddMaintenance() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [tempKey, setTempKey] = useState("");
    const [currentCar, setCurrentCar] = useState();
    const [maintenanceType,setMaintenanceType]=useState("");

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
                    break;
                }
            } else {
                setLoading(true);
            }
        }
    })

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
            "isReserved": false,
            "needMaintenance": true,
            "maintenanceType": maintenanceType,
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
            "renterReturnDate": currentCar.renterReturnDate,
            "renterReturnTime": currentCar.renterReturnTime,
            "reserverPickupDate": currentCar.reserverPickupDate,
            "reserverPickupTime": currentCar.reserverPickupTime,
            "reserverReturnDate": currentCar.reserverReturnDate,
            "reserverReturnTime": currentCar.reserverReturnTime,
            "belongsTo": currentUser.email,
            "extraNotes": currentCar.extraNotes,
            "rentalDays": currentCar.rentalDays,
            "totalPrice": currentCar.totalPrice,
            "rentalTimes": currentCar.rentalTimes,
            "available":true,
        }
        console.log(car)
        cars[tempKey] = car;

        //update the car at tempKey
        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                cars:cars,
                tempKey: -1,
            })
            .then(function () {
                history.push('/manage-inventory');
              
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
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo} alt="rentiq logo" className={styles.logoImg} />
                </div>

                <div className={styles.title}>
                </div>

            </div>

            <div className={styles.main}>
                <img src={cars[tempKey].carImg} className={styles.carImg} />
                <p className={styles.carInformation}>{cars[tempKey].carMake} {cars[tempKey].carModel} {cars[tempKey].carYear}</p>
                <p className={styles.carInformation} style={{ fontSize: '15px' }}>VIN: {cars[tempKey].vin}</p>
                <img src={divider} className={styles.dividerStyle}/>

                <label className={styles.label} for="maintenanceType">Describe the required maintenance:</label>
                <textarea id="maintenanceType"className={styles.textArea} value={maintenanceType} onChange={(e) => setMaintenanceType(e.target.value)} ></textarea>
                <button className={styles.button} onClick={handleSubmit}>Add to Maintenance</button>
            </div>
        </div>
    )
}

export default AddMaintenance;