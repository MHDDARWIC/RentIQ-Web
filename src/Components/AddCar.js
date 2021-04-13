import styles from '../Style-Modules/AddCar.module.css';
import logo from '../assets/rentiq.png';
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DatabaseService from '../DatabaseService';
import firebase from "firebase";
import { useGetData } from "../useGetData";


function AddCar() {
    const [carYear, setCarYear] = useState("");
    const [carIMG, setCarIMG] = useState("");
    const [mileage,setMileage]=useState("");
    const [rate,setRate]=useState("");
    const [color,setColor]=useState("");
    const [vin, setVin] = useState("");
    const [carRate, setCarRate] = useState("");
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();

    const [carData, setCarData] = useState({});


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

    },);

    const getCar = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json&modelyear=${carYear}`); //make request, receive response
        const data = await response.json(); //await then
         //get the data and format it to JSON. Data is stored in this variable now.
        setCarData(data.Results[0]);
        console.log(data.Results[0].BodyClass);
        console.log(carData.BodyClass);
        console.log(carData.Make);
        setCarIMG(`https://www.carlogos.org/car-logos/${carData.Make.toLowerCase()}-logo.png`);
    }


    function handleAdd(e) {
        e.preventDefault();
        //TODO: before pushing, check inventory capacity
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
                "carImg": carIMG, //tbc,
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
                "color":color,
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