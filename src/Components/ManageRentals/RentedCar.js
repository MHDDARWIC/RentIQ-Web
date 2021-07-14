import styles from '../../Style-Modules/ManageRentalsStyles/RentedCar.module.css';
import divider from '../../assets/dividervertical.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';

function RentedCar(props) {
    const car = props.car;
    const [carKey, setCarKey] = useState(0);
    const [currentDoc, setCurrentDoc] = useState("");
    const db = firebase.firestore();
    const [documents] = useGetData();
    const { currentUser } = useAuth();
    const history = useHistory();
    const [status,setStatus]=useState("");

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
                break;
            }
        }
    })

    //TODO: design a function based on the dates to set the status

    async function handleClose(e){
        e.preventDefault();
        //set temp key
        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                tempKey: car.key,
            })
            .then(function () {
                history.push('/close-rental');
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);

            });
    }

    async function handleExtend(e){
        e.preventDefault();
        db.collection("businesses")
        .doc(currentDoc.id)
        .update({
            tempKey: car.key,
        })
        .then(function () {
            history.push('/extend-rental');
        })
        .catch(function (error) {
            console.error("Error writing Value: ", error);
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

                    <div className={styles.renterInfo}>
                        <p className={styles.renterDetails}>Name: {car.currentRenterName}</p>
                        <p className={styles.renterDetails}>DL: {car.currentRenterDL}</p>
                        <p className={styles.renterDetails}>Email: {car.currentRenterEmail}</p>
                        <p className={styles.renterDetails}>Phone: {car.currentRenterPhone}</p>
                        <p className={styles.renterDetails}>Returning: {car.renterReturnDate}</p>
                    </div>

                    


                </div>
                <div className={styles.button}>
                        <div className={styles.extend}>
                            <button className={styles.extendButton} onClick={handleExtend}>Extend Rental</button>
                        </div>

                        <div className={styles.close}>
                            <button className={styles.closeButton} onClick={handleClose}>Close Rental</button>
                        </div>

                    </div>
            </div>

        </div>
    )
}

export default RentedCar;