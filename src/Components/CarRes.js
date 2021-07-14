import styles from '../Style-Modules/CarRes.module.css';
import divider from '../assets/dividervertical.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function CarRes(props) {
    const car = props.car;
    const [carKey, setCarKey] = useState(0);
    const [currentDoc, setCurrentDoc] = useState("");
    const db = firebase.firestore();
    const [documents] = useGetData();
    const { currentUser } = useAuth();
    const history = useHistory();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
                break;
            }
        }
    })

    async function handleSelection(e) {
        e.preventDefault();

        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                tempKey: car.key
            })
            .then(function () {
                console.log("Car selection successfull!");
                history.push('/reservation-confirmation');
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);
                //navigate to failure screen 
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

                    <div className={styles.carInfo}>
                        <p className={styles.carDetails}> {car.bodyClass} - {car.doors} Doors </p>
                        <p className={styles.carDetails}>Color: {car.color}</p>
                        <p className={styles.carDetails}>Mileage: {car.mileage} Miles</p>
                        <p className={styles.carDetails}>Rate: $ {car.rate}</p>
                    </div>

                </div>

                <div className={styles.button}>
                    <button onClick={handleSelection} className={styles.selectButton}>Select</button>

                </div>
            </div>
        </div>
    )
}

export default CarRes;