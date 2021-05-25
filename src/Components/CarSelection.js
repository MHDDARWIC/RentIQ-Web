import styles from '../Style-Modules/CarSelection.module.css';
import logo from '../assets/rentiq.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { useAuth } from '../context/AuthContext';
import Car from './Car';

function CarSelection() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const db = firebase.firestore();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setLoading(false);
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                break;
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
                <img src={logo} className={styles.logoImg} alt="rentiq logo" />
                <p className={styles.titleStyle}>Select a car:</p>
            </div>

            <div className={styles.results}>
                {cars.map((car) => (car.isRented==false && car.isReserved==false && car.needMaintenance==false && car.available==true) ? (
                    <Car car={car} />
                ): (console.log('removed')))}
            </div>
        </div>
    )
}

export default CarSelection;