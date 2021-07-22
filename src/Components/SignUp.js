import { useState } from "react";
import styles from '../Style-Modules/SignUp.module.css';
import logo from '../assets/rentiq.png';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'
import DatabaseService from '../DatabaseService';

function SignUp() {
    const [business, setBusiness] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [inventoryCapacity, setInventoryCapacity] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { signup, currentUser } = useAuth();
    const history = useHistory();
    const [submitted, setSubmitted] = useState(false);
    var cars = []; //array of objects
    var doNotRentList = []; //array of Strings (driver license numbers);
    var tempRenter = { "customerName": "", "customerEmail": "", "customerPhone": "", "renterDL": "", "renterDOB": "", "renterReturnDate": "", "renterReturnTime": "", "renterPickupDate": "", "renterPickupTime": "", "extraNotes": "" };
    var tempReserver = { "customerName": "", "customerEmail": "", "customerPhone": "", "reserverReturnDate": "", "reserverReturnTime": "", "reserverPickupDate": "", "reserverPickupTime": "" };
    var tempKey = 0;
    var earnings = [];

    async function handleSubmit(e) {
        e.preventDefault();
        if(password!=confirmPassword){
            setErrorMessage("Error: Passwords do not match");
        }
        else{
            try {
                setErrorMessage("");
                setLoading(true);
                await signup(email, password);
    
                //set data in the collection after successfully signing up
                var data = { //this holds everything you want to save to the db
                    businessName: business,
                    email: email.toLowerCase(),
                    inventoryCapacity: inventoryCapacity,
                    phone: phone,
                    cars: cars,
                    doNotRentList: doNotRentList,
                    tempRenter: tempRenter,
                    tempReserver: tempReserver,
                    tempKey: tempKey,
                    earnings: earnings
                }
    
                DatabaseService.create(data)
                    .then(() => {
                        setSubmitted(true);
                    })
                    .catch(e => {
                        console.log(e);
                    });
                history.push('/');
            } catch {
                if(password.length<8){
                    setErrorMessage("Error: Password must be at least 8 characters long");
                } else{
                    setErrorMessage("ERROR: Failed to Sign up")
                }
                
            }
            setLoading(false);

        }
    }

    return (
        <div className={styles.gridContainer}>
            <div className={styles.logo}>

            </div>
            <img src={logo} alt="rentIQ logo" className={styles.logoImg} />

            <div className={styles.form}>
                <p className={styles.title}>Welcome!</p>
                <p className={styles.title} style={{ fontSize: '20px', color: 'grey' }}>Please sign up below</p>
                <br/>
                <form onSubmit={handleSubmit}>
                    <label for="businessName" className={styles.labels}>Business Name:</label>
                    <input type="text" id="businessName" value={business} onChange={(e) => setBusiness(e.target.value)} className={styles.inputField} required />

                    <label for="email" className={styles.labels}>Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputField} required />

                    <label for="password" className={styles.labels}>Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} required />
                    <p className={styles.passLength}>Passwords must contain at least 8 characters</p>

                    <label for="confirmPassword" className={styles.labels}>Confirm Password:</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.inputField} required />

                    <label for="phone" className={styles.labels}>Phone Number:</label>
                    <input type="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.inputField} required />

                    <label for="inventoryCapacity" className={styles.labels}>Inventory Capacity:</label>
                    <input type="text" placeholder="e.g. 25" id="inventoryCapacity" value={inventoryCapacity} onChange={(e) => setInventoryCapacity(e.target.value)} className={styles.inputField} required />

                    <button type="submit" disabled={loading} className={styles.button}>Sign Up</button>

                </form>

                <div className={styles.linkDiv}>
                    <Link className={styles.link} to="/sign-in">Already have an account? Sign In here!</Link>
                </div>

                <p className={styles.errorMessage}>{errorMessage}</p>



            </div>

        </div>

    );
}

export default SignUp;