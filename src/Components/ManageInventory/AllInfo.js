import styles from '../../Style-Modules/ManageInventoryStyles/AllInfo.module.css';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/rentiq.png';
import divider from '../../assets/divider.png';

function AllInfo() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [tempKey, setTempKey] = useState("");

    const [currentCar, setCurrentCar] = useState();

    const db = firebase.firestore();

    useEffect(() => {
        console.log("rendered");
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
                }
            } else {
                setLoading(true);
            }
        }
    })
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
                <div className={styles.header}>
                    <img src={cars[tempKey].carImg} alt="the car logo" className={styles.carImg} />
                    <p className={styles.titleStyle}>{cars[tempKey].carMake} {cars[tempKey].carModel} {cars[tempKey].carYear}</p>
                    <p className={styles.titleStyle} style={{fontSize:'20px'}}>VIN: {cars[tempKey].vin}</p>
                    <img src={divider} className={styles.dividerStyle}/>
                </div>

                <div className={styles.details}>
                    <div className={styles.pOne}>
                        <p className={styles.infoStyle}>Vehicle Type: {cars[tempKey].VehicleType}</p>
                        <p className={styles.infoStyle}>Body Class: {cars[tempKey].bodyClass}</p>
                        <p className={styles.infoStyle}>Number of Doors: {cars[tempKey].doors}</p>
                        <p className={styles.infoStyle}>Engine Cylinders: {cars[tempKey].engineCylinders}</p>
                        <p className={styles.infoStyle}>Engine HP: {cars[tempKey].engineHP}</p>
                        <p className={styles.infoStyle}>Primary Fuel Type: {cars[tempKey].fuelTypePrimary}</p>
                    </div>

                    <div className={styles.pTwo}>
                        <p className={styles.infoStyle}>Last Rented on: {cars[tempKey].lastRented}</p>
                        <p className={styles.infoStyle}>Mileage: {cars[tempKey].mileage}</p>
                        <p className={styles.infoStyle}>Color: {cars[tempKey].color}</p>
                        <p className={styles.infoStyle}>Rate: ${cars[tempKey].rate}</p>
                        <p className={styles.infoStyle}>Rental Times: {cars[tempKey].rentalTimes}</p>
                        <p className={styles.infoStyle}>Trim: {cars[tempKey].trim}</p>
                    </div>

                </div>
            </div>

        </div>
    )

}

export default AllInfo;