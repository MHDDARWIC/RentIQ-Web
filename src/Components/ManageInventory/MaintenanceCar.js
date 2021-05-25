import styles from '../../Style-Modules/ManageInventoryStyles/MaintenanceCar.module.css';
import divider from '../../assets/dividervertical.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
function MaintenanceCar(props){
    const car = props.car;
    const [carKey, setCarKey] = useState(0);
    const [currentDoc, setCurrentDoc] = useState("");
    const db = firebase.firestore();
    const [documents] = useGetData();
    const { currentUser } = useAuth();
    const history = useHistory();
    const [tempKey, setTempKey] = useState("");
    const [currentCar, setCurrentCar] = useState();
    const [cars, setCars] = useState("");

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                setTempKey(documents[j].value.tempKey);
                setCurrentCar(cars[tempKey]);
                break;
            }
        }
    })

    function removeMaintenance(e) {
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
            "currentReserverName": car.currentReserverName,
            "currentRenterDL": car.currentRenterDL,
            "currentRenterPhone": car.currentRenterPhone,
            "currentReserverPhone": car.currentReserverPhone,
            "currentRenterEmail": car.currentRenterEmail,
            "currentReserverEmail": car.currentReserverEmail,
            "currentRenterDOB": car.currentRenterDOB,
            "mileage": car.mileage,
            "rate": car.rate,
            "color": car.color,
            "lastRented": car.lastRented,
            "renterPickupDate": car.renterPickupDate,
            "renterPickupTime": car.renterPickupTime,
            "renterReturnDate": car.renterReturnDate,
            "renterReturnTime": car.renterReturnTime,
            "reserverPickupDate": car.reserverPickupDate,
            "reserverPickupTime": car.reserverPickupTime,
            "reserverReturnDate": car.reserverReturnDate,
            "reserverReturnTime": car.reserverReturnTime,
            "belongsTo": currentUser.email,
            "extraNotes": car.extraNotes,
            "rentalDays": car.rentalDays,
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
                history.push('/manage-inventory');
              
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);

            });

    }

    return (
        <div className={styles.gridContainer}>
            <div className={styles.car}>
                <div className={styles.title}>
                    <p className={styles.titleStyle}>{car.carMake} {car.carModel} {car.carYear}</p>
                </div>

                <div className={styles.main}>
                    <div className={styles.carLogo}>
                        <img src={car.carImg} alt="logo of the car" className={styles.carImg} />
                    </div>

                    <div className={styles.divider}>
                        <img src={divider} alt="a vertical divider" className={styles.dividerStyle} />
                    </div>

                    <div className={styles.carInfo}>
                        <p className={styles.carInformation}>VIN: {car.vin}</p>
                        <p className={styles.carInformation}>Maintenance Reason: {car.maintenanceType}</p>
                        <p className={styles.carInformation}>Mileage: {car.mileage} Miles</p>
                        <p className={styles.carInformation}>Times Rented: {car.rentalTimes}</p>
                    </div>
                </div>

                <div className={styles.button}>
                    <button className={styles.buttonStyle} onClick={removeMaintenance}>Maintenance Complete</button>
                </div>
            </div>
        </div>
    )

}

export default MaintenanceCar;