import styles from '../../Style-Modules/AddCar.module.css';
import logo from '../../assets/rentiq.png';
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import divider from '../../assets/divider.png';
import dividerVer from '../../assets/dividervertical.png';

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
    const [loaded, setLoaded] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

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
        console.log(data.Results[0].Make);
        if (data.Results[0].Make === "") {
            setErrorMessage("The car was not found. Please try searching for another car");
        } else {
            setCarData(data.Results[0]);
            setCarIMG(`https://www.carlogos.org/car-logos/${data.Results[0].Make.toLowerCase()}-logo.png`);
            setLoaded(false);

        }

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
                "mileage": mileage,
                "rate": rate,
                "color": color,
                "lastRented": "",
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
                "rentalDays": 0,
                "totalPrice": 0,
                "rentalTimes": 0,
                "available": true
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

    return loaded ? (
        <div>
            <div className={styles.gridContainer}>
                <div className={styles.logo}>
                    <img src={logo} alt="rentiq logo" className={styles.logoImg} />
                    
                </div>

                <div className={styles.title}>
                    <p className={styles.titleStyle}>Add a Car To Your Inventory</p>
                    <img src={divider} className={styles.dividerStyle} />
                </div>

                <div className={styles.form}>
                    <div className={styles.input}>
                        <form onSubmit={getCar}>
                            <label for="vin" className={styles.labels}>Enter vin number:</label>
                            <br />
                            <input type="text" id="vin" value={vin} onChange={(e) => setVin(e.target.value)} className={styles.inputField} required />

                            <label for="carYear" className={styles.labels}>Car Year:</label>
                            <br />
                            <input type="text" id="carYear" value={carYear} onChange={(e) => setCarYear(e.target.value)} className={styles.inputField} required />


                            <label for="mileage" className={styles.labels}>Mileage:</label>
                            <br />
                            <input style={{ backgroundColor: 'rgba(255, 255, 255, 0.233)', border: 'none' }} disabled type="text" id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} className={styles.inputField} />


                            <label for="rate" className={styles.labels}>Daily Rate:</label>
                            <br />
                            <input style={{ backgroundColor: 'rgba(255, 255, 255, 0.233)', border: 'none' }} disabled type="text" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className={styles.inputField} />


                            <label for="color" className={styles.labels}>Car Color:</label>
                            <br />
                            <input style={{ backgroundColor: 'rgba(255, 255, 255, 0.233)', border: 'none' }} disabled type="text" id="color" value={color} onChange={(e) => setColor(e.target.value)} className={styles.inputField} />

                            <button type="submit" className={styles.button}>Search</button>
                            

                        </form>
                    </div>

                    <div className={styles.divider}>
                        <img src={dividerVer} className={styles.dividerVer} />
                    </div>

                    <div className={styles.results}>
                        <img src={logo} style={{ opacity: '50%', height: '100px', position: 'relative', top: '35%' }} />
                        <p style={{color:'red',textAlign:'center'}}>{errorMessage}</p>
                    </div>

                </div>

            </div>
        </div>
    ) : (
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
                <img src={logo} alt="rentiq logo" className={styles.logoImg} />
            </div>

            <div className={styles.title}>
                <p className={styles.titleStyle}>Add a Car To Your Inventory</p>
                <img src={divider} className={styles.dividerStyle} />
            </div>

            <div className={styles.form}>
                <div className={styles.input}>
                    <form onSubmit={getCar}>
                        <label for="vin" className={styles.labels}>Enter vin number:</label>
                        <br />
                        <input type="text" id="vin" value={vin} onChange={(e) => setVin(e.target.value)} className={styles.inputField} required />

                        <label for="carYear" className={styles.labels}>Car Year:</label>
                        <br />
                        <input type="text" id="carYear" value={carYear} onChange={(e) => setCarYear(e.target.value)} className={styles.inputField} required />


                        <label for="mileage" className={styles.labels}>Mileage:</label>
                        <br />
                        <input type="text" id="mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} className={styles.inputField} required />


                        <label for="rate" className={styles.labels}>Daily Rate:</label>
                        <br />
                        <input type="text" id="rate" value={rate} onChange={(e) => setRate(e.target.value)} className={styles.inputField} required />


                        <label for="color" className={styles.labels}>Car Color:</label>
                        <br />
                        <input type="text" id="color" value={color} onChange={(e) => setColor(e.target.value)} className={styles.inputField} required />


                    </form>
                </div>

                <div className={styles.divider}>
                    <img src={dividerVer} className={styles.dividerVer} />
                </div>

                <div className={styles.results}>
                    <img src={carIMG} className={styles.carImg} />
                    <p className={styles.carInfo} style={{fontSize:'40px',margin:0}}>{carData.Make} {carData.Model} {carYear}</p>
                    <p className={styles.carInfo}>Vehicle Type: {carData.VehicleType}</p>
                    <p className={styles.carInfo}>Body Class: {carData.BodyClass}</p>
                    <p className={styles.carInfo}>Number Of Doors: {carData.Doors}</p>
                    <p className={styles.carInfo}>Primary Fuel Type: {carData.FuelTypePrimary}</p>
                    <p className={styles.carInfo}>Engine Horsepower: {carData.EngineHP} HP</p>
                    <p className={styles.carInfo}>Trim: {carData.Trim}</p>
                    <button onClick={handleAdd} className={styles.button}>Add Car</button>
                    
                </div>

            </div>

        </div>

    );
}

export default AddCar;