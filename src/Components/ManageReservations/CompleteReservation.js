import styles from '../../Style-Modules/ManageReservationsStyles/CompleteReservation.module.css';
import logo from '../../assets/rentiq.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { useAuth } from '../../context/AuthContext';
import divider from '../../assets/dividervertical.png';
import { Link, useHistory } from 'react-router-dom';


function CompleteReservation() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [tempKey, setTempKey] = useState("");
    const [currentCar, setCurrentCar] = useState();
    const [DL,setDL]=useState("");
    const [dob,setDOB]=useState();
    const [extraNotes,setExtraNotes]=useState("");

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

    //saved
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
            "currentRenterName": cars[tempKey].currentReserverName,
            "currentReserverName": "",
            "currentRenterDL": DL,
            "currentRenterPhone": cars[tempKey].currentReserverPhone,
            "currentReserverPhone": "",
            "currentRenterEmail": cars[tempKey].currentReserverEmail,
            "currentReserverEmail": "",
            "currentRenterDOB": dob,
            "mileage": currentCar.mileage,
            "rate": currentCar.rate,
            "color": currentCar.color,
            "lastRented": cars[tempKey].reserverPickupDate,
            "renterPickupDate": cars[tempKey].reserverPickupDate,
            "renterPickupTime": cars[tempKey].reserverPickupTime,
            "renterReturnDate": cars[tempKey].reserverReturnDate,
            "renterReturnTime": cars[tempKey].reserverReturnTime,
            "reserverPickupDate": "",
            "reserverPickupTime": "",
            "reserverReturnDate": "",
            "reserverReturnTime": "",
            "belongsTo": currentUser.email,
            "extraNotes": extraNotes,
            "rentalDays": cars[tempKey].rentalDays,
            "totalPrice": cars[tempKey].totalPrice,
            "rentalTimes": currentCar.rentalTimes + 1,
            "available":true,
        }

        cars[tempKey] = car;

        //update the car at tempKey
        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                cars: cars,
                tempKey: -1,
                tempRenter: {},
                tempReserver:{}
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
                <img src={logo} alt="rentiq logo" className={styles.logoImg} />
            </div>

            <div className={styles.main}>
                <div className={styles.info}>
                    <div className={styles.carImg}>
                        <img src={cars[tempKey].carImg} className={styles.carLogo} />
                    </div>

                    <div className={styles.divider}>
                        <img src={divider} className={styles.dividerStyle} />
                    </div>

                    <div className={styles.resInfo}>
                        <p className={styles.totalStyle} style={{fontSize:'20px'}}>Total: </p>
                        <p className={styles.totalStyle} style={{position:'relative',bottom:'15%'}}>${cars[tempKey].totalPrice}</p>
                        <p className={styles.infoStyle}>From: {cars[tempKey].reserverPickupDate} to: {cars[tempKey].reserverReturnDate} ({cars[tempKey].rentalDays} days)</p>
                        <p className={styles.infoStyle}>Renter: {cars[tempKey].currentReserverName}</p>
                        <p className={styles.infoStyle}>Email: {cars[tempKey].currentReserverEmail}</p>
                        <p className={styles.infoStyle}>Phone: {cars[tempKey].currentReserverPhone}</p>
                    </div>
                </div>

                <div className={styles.input}>
                <label for="DL" className={styles.labels}>Driver's License Number:</label>
                        <br />
                        <input type="text" id="DL" value={DL} onChange={(e) => setDL(e.target.value)} className={styles.inputField} required />
                        <br />

                        <label for="DOB" className={styles.labels}>Renter's Date of Birth:</label>
                        <br />
                        <input type="date" id="DOB" value={dob} onChange={(e) => setDOB(e.target.value)} className={styles.inputField} required />
                        <br />

                        <label for="extraNotes" className={styles.labels}>Extra Notes (optional):</label>
                        <br />
                        <textarea type="text" id="extraNotes" value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} className={styles.textArea} />
                        <br />

                        <button className={styles.button} onClick={handleSubmit}>Finalize and Rent</button>

                </div>
            </div>

        </div>

    )
}

export default CompleteReservation;