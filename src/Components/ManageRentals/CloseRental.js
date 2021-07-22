import styles from '../../Style-Modules/ManageRentalsStyles/CloseRental.module.css';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/rentiq.png';
import divider from '../../assets/dividervertical.png';


function CloseRental(){
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [tempKey, setTempKey] = useState("");
    const [currentCar, setCurrentCar] = useState();

    const [returningMileage,setReturningMileage]=useState("");
    const [needMaintenance,setNeedMaintenance]=useState(false);
    const [maintenanceType,setMaintenanceType]=useState("");

    const db = firebase.firestore();

    useEffect(() => {
        console.log(needMaintenance)
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
            "needMaintenance": needMaintenance,
            "maintenanceType": maintenanceType,
            "currentRenterName": "",
            "currentReserverName": "",
            "currentRenterDL": "",
            "currentRenterPhone": "",
            "currentReserverPhone": "",
            "currentRenterEmail": "",
            "currentReserverEmail": "",
            "currentRenterDOB": "",
            "mileage": returningMileage,
            "rate": currentCar.rate,
            "color": currentCar.color,
            "lastRented": currentCar.lastRented,
            "renterPickupDate": "",
            "renterPickupTime": "",
            "renterReturnDate": "",
            "renterReturnTime": "",
            "reserverPickupDate": "",
            "reserverPickupTime": "",
            "reserverReturnDate": "",
            "reserverReturnTime": "",
            "belongsTo": currentUser.email,
            "extraNotes": "",
            "rentalDays": "",
            "totalPrice": "",
            "rentalTimes": currentCar.rentalTimes,
            "available":true
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
                history.push('/close-success');

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
                <img src={logo} alt="rentiq logo" className={styles.logoImg}/>
            </div>

            <div className={styles.details}>
                <div className={styles.information}>
                    <div className={styles.carLogo}>
                        <img src={cars[tempKey].carImg} alt="the car logo" className={styles.carLogoImg}/>
                        <p className={styles.carInfoStyle}>{cars[tempKey].carMake} {cars[tempKey].carModel} {cars[tempKey].carYear}</p>
                        <p className={styles.carInfoStyle}>Rented By: {cars[tempKey].currentRenterName}</p>
                    </div>

                    <div className={styles.divider}>
                        <img src={divider} alt="a vertical divider" className={styles.dividerStyle}/>
                    </div>

                    <div className={styles.price}>
                        <p className={styles.tbp}>Total to be paid:</p>
                        <p className={styles.priceTotal} style={{fontSize:'100px'}}>$ {cars[tempKey].totalPrice}</p>
                    </div>
                </div>

                <div className={styles.input}>
                    <label for="returningMileage" className={styles.labels} style={{textAlign:'center',display:'block'}}>Returning Mileage: </label>
                    <input type="text" id="returningMileage" value={returningMileage} onChange={(e) => setReturningMileage(e.target.value)} className={styles.inputField} required />
                    
                    <label className={styles.labels}>Does the car require Maintenance? </label>
                    <label className={styles.labels}>Yes </label>
                    <input type="radio" id="yes" name="needMaintenance" style={{marginLeft:'10px',cursor:'pointer'}} value={needMaintenance}  onClick={(e) =>setNeedMaintenance(true)}/>
                    <label className={styles.labels}>No </label>
                    <input type="radio" id="no" name="needMaintenance" style={{marginLeft:'10px',cursor:'pointer'}} value={needMaintenance} onClick={(e) =>setNeedMaintenance(false)}/>
                    
                    <br/>
                    <br/>
                    <label className={styles.labels} style={{textAlign:'center',display:'block'}} for="maintenanceType">Maintenance Description:</label>
                    <textarea id="maintenanceType" value={maintenanceType} onChange={(e) => setMaintenanceType(e.target.value)} className={styles.textArea}></textarea>
                
                    <button className={styles.button} onClick={handleSubmit}>Close Rental</button>

                </div>
            </div>

        </div>

    )
}

export default CloseRental;