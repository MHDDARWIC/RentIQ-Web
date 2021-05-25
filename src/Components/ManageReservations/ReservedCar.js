import styles from '../../Style-Modules/ManageReservationsStyles/ReservedCar.module.css'
import divider from '../../assets/dividervertical.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function ReservedCar(props){
    const car = props.car;
    const [carKey, setCarKey] = useState(0);
    const [currentDoc, setCurrentDoc] = useState("");
    const db = firebase.firestore();
    const [documents] = useGetData();
    const { currentUser } = useAuth();
    const history = useHistory();
    const [status,setStatus]=useState("");
    const [cars, setCars] = useState("");

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                break;

            }
        }
    })

    async function handleComplete(e) {
        e.preventDefault();

        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                tempKey: car.key
            })
            .then(function () {
                history.push('/complete-reservation');
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);
                //navigate to failure screen 
            });

    }

    async function cancelReservation(e){
        e.preventDefault();
        let tempcar = {
            "key": car.key,
            "vin": car.vin,
            "carMake": car.carMake,
            "carYear": car.carYear,
            "carModel": car.carModel,
            "doors": car.doors,
            "bodyClass": car.bodyClass,
            'fuelTypePrimary': car.fuelTypePrimary,
            'VehicleType': car.VehicleType,
            "engineCylinders": car.engineCylinders,
            "engineHP": car.engineHP,
            "trim": car.trim,
            "carImg": car.carImg,
            "isRented": false,
            "isReserved": false,
            "needMaintenance": false,
            "maintenanceType": "",
            "currentRenterName": car.currentRenterName,
            "currentReserverName": "",
            "currentRenterDL": car.currentRenterDL,
            "currentRenterPhone": car.currentRenterPhone,
            "currentReserverPhone": "",
            "currentRenterEmail": car.currentRenterEmail,
            "currentReserverEmail": "",
            "currentRenterDOB": car.currentRenterDOB,
            "mileage": car.mileage,
            "rate": car.rate,
            "color": car.color,
            "lastRented": car.lastRented,
            "renterPickupDate": car.renterPickupDate,
            "renterPickupTime": car.renterPickupTime,
            "renterReturnDate": car.renterReturnDate,
            "renterReturnTime": car.renterReturnTime,
            "reserverPickupDate": "",
            "reserverPickupTime": "",
            "reserverReturnDate": "",
            "reserverReturnTime": "",
            "belongsTo": currentUser.email,
            "extraNotes": car.extraNotes,
            "rentalDays": 0,
            "totalPrice": car.totalPrice,
            "rentalTimes": car.rentalTimes,
            "available":true,
        }
       
        cars[car.key] = tempcar;

        //update the car at tempKey
        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                cars:cars,
            })
            .then(function () {
                window.location.reload();
              
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);

            });

    }

    return (
        <div className={styles.gridContainer}>
            <div className={styles.car}>
                <div className={styles.title}>
                    <p>{car.carMake} {car.carModel} {car.carYear}</p>
                </div>

                <div className={styles.details}>
                    <div className={styles.carLogo}>
                        <img src={car.carImg} alt="logo of the car" className={styles.carImg} />
                    </div>

                    <div className={styles.divider}>
                        <img src={divider} alt="a vertical divider" className={styles.divider} />
                    </div>

                    <div className={styles.renterInfo}>
                        <p className={styles.renterDetails}> Reserved By: {car.currentReserverName}</p>
                        <p className={styles.renterDetails}> Email: {car.currentReserverEmail}</p>
                        <p className={styles.renterDetails}> Phone: {car.currentReserverPhone}</p>
                        <p className={styles.renterDetails}> Pickup Date and Time: {car.reserverPickupDate} {car.reserverPickupTime}</p>
                        <p className={styles.renterDetails}> Total: ${car.totalPrice}</p>
                    </div>
                </div>
                <div className={styles.button}>
                        <div className={styles.extend}>
                            <button className={styles.completeButton} onClick={handleComplete} >Complete Reservation</button>
                        </div>

                        <div className={styles.close}>
                            <button className={styles.cancelButton} onClick={cancelReservation}>Cancel Reservation</button>
                        </div>

                    </div>
            </div>

        </div>
    )
}

export default ReservedCar;