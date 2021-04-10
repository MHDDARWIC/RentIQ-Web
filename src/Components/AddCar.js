import styles from '../Style-Modules/AddCar.module.css';
import logo from '../assets/rentiq.png';
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DatabaseService from '../DatabaseService';
import firebase from "firebase";
import { useGetData } from "../useGetData";


function AddCar() {
    const [carMake, setCarMake] = useState("");
    const [carYear, setCarYear] = useState("");
    const [carModel, setCarModel] = useState("");
    const [carRate, setCarRate] = useState("");
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();

    const db = firebase.firestore();


    useEffect(() => {
        //getting the specific doc out of all the docs
        for (var j = 0; j < documents.length; j++) {

            console.log(currentUser.email);
            console.log(documents[j].value.email);
            if (documents[j].value.email === currentUser.email) {
                console.log("belongs to ")
                // console.log(documents[j].value.businessName);
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                //console.log(currentDoc.value.cars.length);
                console.log(documents[j].value.cars);
            }
        }

    });





    function handleAdd(e) {
        e.preventDefault();
        //TODO: before pushing, check inventory capacity
        if (currentDoc.value.cars.length > currentDoc.value.inventoryCapacity) {
            history.push('/failure-add');
        } else {
            let car = {
                "key": currentDoc.value.cars.length,
                "carMake": carMake,
                "carYear": carYear,
                "carModel": carModel,
                "fuelCapacity": "1", //tbc
                "carImg": "url", //tbc,
                "isRented": false,
                "isReserved": false,
                "needMaintenance": false,
                "maintenanceType": "",
                "currentRenterName": "",
                "currentReserverName": "",
                "currentRenterDL": "",
                "currentRenterPhone": "",
                "currentReserverPhone": "",
                "currentRenterEmail": "",
                "currentReserverEmail": "",
                "currentRenterDOB": "",
                "carReturnDate": "",
                "mileage": 1,//tbc
                "rate": carRate,
                "lastRented": "",
                "reservationPickupDate": "",
                "reservationPickupTime": "",
                "belongsTo": currentUser.email, //tbc (business name)
                "extraNotes": ""
            }

            cars.push(car);

            db.collection("businesses")
                .doc(currentDoc.id)
                .update({
                    //old used set instead of update
                    // email:currentUser.email,
                    // phone:currentDoc.value.phone,
                    // inventoryCapacity:currentDoc.value.inventoryCapacity,
                    // businessName:currentDoc.value.businessName,
                    cars: cars
                })
                .then(function () {
                    console.log("Value successfully written!");
                    history.push('/success-add');
                })
                .catch(function (error) {
                    console.error("Error writing Value: ", error);
                    //navigate to failure screen 
                });

        }

    }

    return (
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
                <img src={logo} alt="rentiq logo" className={styles.logoImg} />
            </div>

            <div className={styles.form}>
                <div className={styles.search}>
                    <form onSubmit={handleAdd}>
                        <label for="carMake" className={styles.labels}>Car Make:</label>
                        <br />
                        <input type="text" id="carMake" value={carMake} onChange={(e) => setCarMake(e.target.value)} className={styles.inputField} required />

                        <br />

                        <label for="carModel" className={styles.labels}>Car Model:</label>
                        <br />
                        <input type="text" id="carModel" value={carModel} onChange={(e) => setCarModel(e.target.value)} className={styles.inputField} required />

                        <br />

                        <label for="carYear" className={styles.labels}>Car Year:</label>
                        <br />
                        <input type="text" id="carYear" value={carYear} onChange={(e) => setCarYear(e.target.value)} className={styles.inputField} required />

                        <br />

                        <button type="submit" className={styles.button}>Search</button>

                    </form>
                </div>

                <div className={styles.results}>
                    <span>Values</span>
                    {documents.map((documents) => (
                        <div key={documents.id}>
                            <div>
                                Document: {documents.id} {documents.value.businessName}
                            </div>
                        </div>
                    ))}

                </div>

            </div>

        </div>

    );
}

export default AddCar;