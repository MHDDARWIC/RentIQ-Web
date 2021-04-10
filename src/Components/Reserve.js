import styles from '../Style-Modules/Reserve.module.css';
import logo from '../assets/rentiq.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Reserve() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const history = useHistory();

    const db = firebase.firestore();

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [reserverReturnDate, setReserverReturnDate] = useState("");
    const [reserverReturnTime, setReserverReturnTime] = useState("");
    const [reserverPickupDate, setReserverPickupDate] = useState("");
    const [reserverPickupTime, setReserverPickupTime] = useState("");



    useEffect(() => {
        //getting the specific doc out of all the docs
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
            }
        }

    });

    function handleSubmit(e) {
        e.preventDefault();
        //To do: check do not rent list
        let reserver = {
            "customerName": customerName,
            "customerEmail": customerEmail,
            "customerPhone": customerPhone,
            "reserverPickupDate": reserverPickupDate,
            "reserverPickupTime": reserverPickupTime,
            "reserverReturnDate": reserverReturnDate,
            "reserverReturnTime": reserverReturnTime,

        }

        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                tempReserver: reserver
            })
            .then(function () {
                console.log("Value successfully written!");
                history.push('/car-selection');
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);
                //navigate to failure screen 
            });

    }
    return (
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
                <img src={logo} alt="rentiq logo" className={styles.logoImg} />
            </div>

            <div className={styles.form}>
                <form onSubmit={handleSubmit}>
                    <label for="customerName" className={styles.labels}>Full Name:</label>
                    <br />
                    <input type="text" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className={styles.inputField} required />
                    <br />

                    <label for="customerEmail" className={styles.labels}>Email Address:</label>
                    <br />
                    <input type="email" id="customerEmail" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className={styles.inputField} required />
                    <br />

                    <label for="customerPhone" className={styles.labels}>Phone Number:</label>
                    <br />
                    <input type="phone" id="customerPhone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className={styles.inputField} required />
                    <br />

                    <label for="reserverPickupDate" className={styles.labels}>Car Pickup Date and Time:</label>
                    <br />
                    <input type="date" id="reserverPickupDate" value={reserverPickupDate} onChange={(e) => setReserverPickupDate(e.target.value)} className={styles.inputFieldDate} required />
                    <input type="time" id="reserverPickupTime" value={reserverPickupTime} onChange={(e) => setReserverPickupTime(e.target.value)} className={styles.inputFieldTime} required />

                    <label for="reserverReturnDate" className={styles.labels}>Car Return Date and Time:</label>
                    <br />
                    <input type="date" id="reserverReturnDate" value={reserverReturnDate} onChange={(e) => setReserverReturnDate(e.target.value)} className={styles.inputFieldDate} required />
                    <input type="time" id="reserverReturnTime" value={reserverReturnTime} onChange={(e) => setReserverReturnTime(e.target.value)} className={styles.inputFieldTime} required />

                    <button className={styles.button} type="submit">To Car Selection</button>
                </form>


            </div>

        </div>
    )
}

export default Reserve;