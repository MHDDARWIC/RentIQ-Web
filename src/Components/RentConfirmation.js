import styles from '../Style-Modules/RentConfirmation.module.css';
import temp from '../assets/temp.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/rentiq.png';


function RentConfirmation() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [tempRenter, setTempRenter] = useState("");
    const [tempKey, setTempKey] = useState("");

    const db = firebase.firestore();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setLoading(false);
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                setTempRenter(documents[j].value.tempRenter);
                setTempKey(documents[j].value.tempKey);
            } else {
                setLoading(true);
            }
        }
    })

    function handleSubmit(e){
        e.preventDefault();
        //TODO: some validation
        //todo: db
    }
    return loading ? (
        <div>
            <p>Loading...</p>
        </div>

    ) : (
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
                <img src={logo} className={styles.logoImg} alt="rentiq logo"/>
            </div>

            <div className={styles.confirmation}>
                <div className={styles.pOne}>
                    <img src={temp} className={styles.carImg}/>
                    <h4>{cars[tempKey].carMake} {cars[tempKey].carModel} {cars[tempKey].carYear} </h4>
                    <h4>Mileage: tbf</h4>
                    <h4>Rate: tbf</h4>
                </div>

                <div className={styles.pTwo}>
                    <h2>Total: $0</h2>
                    <h2>Renter: {tempRenter.customerName} </h2>
                    <h2>{tempRenter.renterDL} </h2>
                    <h2> {tempRenter.renterReturnDate} </h2>

                </div>
            </div>
            <button>Confirm and Rent</button>
        </div>

    )

}

export default RentConfirmation;