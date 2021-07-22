import { useState } from "react";
import logo from '../assets/rentiq.png';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../Style-Modules/ForgotPassword.module.css';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { resetPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setMessage("");
            setErrorMessage("");
            setLoading(true);
            await resetPassword(email);
            setMessage("Please check your inbox for instructions to reset your password");
        } catch {
            setErrorMessage("ERROR: Failed to Reset Password")
        }
        setLoading(false);
    }


    return (
        <div className={styles.gridContainer}>
            <div className={styles.logo}>

            </div>
            <img src={logo} alt="the rentiq logo" className={styles.logoImg} />
            <div className={styles.form}>
                <p className={styles.title}>Welcome Back!</p>
                <p className={styles.title} style={{ fontSize: '20px', color: 'grey' }}>Please sign in below</p>
                <br />
                <form onSubmit={handleSubmit}>
                    <label for="email" className={styles.labels}>Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputField} required />

                    <button type="submit" className={styles.button} >Reset</button>
                    <strong>{message}</strong>
                </form>
                <div className={styles.linkDiv}>
                    <Link className={styles.link} to="/sign-in">Sign in Instead</Link>
                </div>
                <p className={styles.errorMessage}>{errorMessage}</p>
            </div>


        </div>
    );
}

export default ForgotPassword;