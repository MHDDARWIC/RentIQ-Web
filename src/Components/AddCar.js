import styles from '../Style-Modules/AddCar.module.css';
import logo from '../assets/rentiq.png';
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import firebase from "firebase";
import { useGetData } from "../useGetData";

// console.log(currentUser.email);
    // console.log(documents[j].value.email);
    // console.log(documents[j].value.businessName);
    //console.log(currentDoc.value.cars.length);
    //console.log(documents[j].value.cars);
    // console.log(carData.BodyClass);
    // console.log(carData.Make);

function AddCar() {
    const [vin, setVin] = useState("");
    const [carYear, setCarYear] = useState("");
    const [mileage, setMileage] = useState("");
    const [rate, setRate] = useState("");
    const [color, setColor] = useState("");
    const [carIMG, setCarIMG] = useState("");
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();
    const [carData, setCarData] = useState({});

    const db = firebase.firestore();

    useEffect(() => {
        //getting the specific doc out of all the docs
        console.log("redered");
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
            }
        }
    });

    async function getCar(e) {
        e.preventDefault();
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json&modelyear=${carYear}`); //make request, receive response
        const data = await response.json();
        console.log(data.Results[0].BodyClass);
        setCarData(data.Results[0]);
        setCarIMG(`https://www.carlogos.org/car-logos/${data.Results[0].Make.toLowerCase()}-logo.png`);
    }

    function handleAdd(e) {
        e.preventDefault();
        if (currentDoc.value.cars.length > currentDoc.value.inventoryCapacity) {
            history.push('/failure-add');
        } else {
            let car = {
                "key": currentDoc.value.cars.length,
                "vin": vin,
                "carMake": carData.Make,
                "carYear": carYear,
                "carModel": carData.Model,
                "doors": carData.Doors,
                "bodyClass": carData.BodyClass,
                'fuelTypePrimary': carData.FuelTypePrimary,
                'VehicleType': carData.VehicleType,
                "engineCylinders": carData.EngineCylinders,
                "engineHP": carData.EngineHP,
                "trim": carData.Trim,
                "carImg": carIMG,
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
                "mileage": mileage,
                "rate": rate,
                "color": color,
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
                    <form onSubmit={getCar}>

                        <label for="vin" className={styles.labels}>Enter vin number:</label>
                        <br />
                        <input type="text" id="vin" value={vin} onChange={(e) => setVin(e.target.value)} className={styles.inputField} required />
                        <br />


                        <label for="carYear" className={styles.labels}>Car Year:</label>
                        <br />
                        <input type="text" id="carYear" value={carYear} onChange={(e) => setCarYear(e.target.value)} className={styles.inputField} required />
                        <br />

                        <label for="mileage" className={styles.labels}>Mileage:</label>
                        <br />
                        <input type="text" id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} className={styles.inputField} required />
                        <br />

                        <label for="rate" className={styles.labels}>Daily Rate:</label>
                        <br />
                        <input type="text" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className={styles.inputField} required />
                        <br />

                        <label for="color" className={styles.labels}>Car Color:</label>
                        <br />
                        <input type="text" id="color" value={color} onChange={(e) => setColor(e.target.value)} className={styles.inputField} required />
                        <br />


                        <button type="submit" className={styles.button}>Search</button>

                    </form>
                </div>

                <div className={styles.results}>
                    <img src={carIMG} />
                    <p>{carData.Make} {carData.Model} {carYear}</p>
                    <p>Vehicle Type: {carData.VehicleType}</p>
                    <p>Body Class: {carData.BodyClass}</p>
                    <p>Number Of Doors: {carData.Doors}</p>
                    <p>Primary Fuel Type: {carData.FuelTypePrimary}</p>
                    <p>Engine Horsepower: {carData.EngineHP} HP</p>
                    <p>Trim: {carData.Trim}</p>
                    <button onClick={handleAdd}>Add Car!</button>
                </div>

            </div>

        </div>

    );
}

export default AddCar;