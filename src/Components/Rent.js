import styles from '../Style-Modules/Rent.module.css';
import logo from '../assets/rentiq.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Rent() {

    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const history = useHistory();

    const db = firebase.firestore();

    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [renterDL, setRenterDL] = useState("");
    const [renterDOB, setRenterDOB] = useState("");
    const [renterReturnDate, setRenterReturnDate] = useState("");
    const [renterReturnTime, setRenterReturnTime] = useState("");
    const renterPickupDate=new Date().toLocaleDateString();
    const renterPickupTime=new Date().toLocaleTimeString();
    const [extraNotes, setExtraNotes] = useState("");

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
        let renter = {
            "customerName":customerName,
            "customerEmail":customerEmail,
            "customerPhone":customerPhone,
            "renterDL":renterDL,
            "renterDOB":renterDOB,
            "renterPickupDate":renterPickupDate,
            "renterPickupTime":renterPickupTime,
            "renterReturnDate":renterReturnDate,
            "renterReturnTime":renterReturnTime,
            "extraNotes":extraNotes
        }

        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                tempRenter: renter
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
                <h3 className={styles.title}>Please enter the renter's info:</h3>
            </div>

            <div className={styles.form}>
                <div className={styles.pOne}>

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

                    <label for="renterDL" className={styles.labels}>Driver's License Number:</label>
                    <br />
                    <input type="text" id="renterDL" value={renterDL} onChange={(e) => setRenterDL(e.target.value)} className={styles.inputField} required />
                    <br />
                    <button className={styles.button} onClick={handleSubmit}>To Car Selection</button>
                </div>

                <div className={styles.pTwo}>
                    <label for="renterDOB" className={styles.labels}>Renter's Date of Birth:</label>
                    <br />
                    <input type="date" id="renterDOB" value={renterDOB} onChange={(e) => setRenterDOB(e.target.value)} className={styles.inputField} required />
                    <br />

                    <label for="renterReturnDate" className={styles.labels}>Car Return Date and Time:</label>
                    <br />
                    <input type="date" id="renterReturnDate" value={renterReturnDate} onChange={(e) => setRenterReturnDate(e.target.value)} className={styles.inputFieldDate} required />
                    <input type="time" id="renterReturnTime" value={renterReturnTime} onChange={(e) => setRenterReturnTime(e.target.value)} className={styles.inputFieldTime} required />

                    <label for="extraNotes" className={styles.labels}>Extra Notes (optional):</label>
                    <br />
                    <textarea type="text" id="extraNotes" value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} className={styles.textArea} />
                    <br />
                </div>



            </div>

        </div>

    );
}

export default Rent;