import { useState } from "react";
import styles from '../Style-Modules/SignIn.module.css';
import logo from '../assets/rentiq.png';
import {Link, useHistory} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage,setErrorMessage]=useState("");
    const [loading,setLoading]=useState(false);
    const {signin,currentUser}=useAuth();
    const history =useHistory();

    async function handleSubmit(e){
        e.preventDefault();
            try{
                setErrorMessage("");
                setLoading(true); 
                await signin(email,password); 
                history.push('/')
            } catch{
                setErrorMessage("Failed to Sign In - Inavlid Email or Password ");
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
                <p className={styles.title} style={{fontSize:'20px',color:'grey'}}>Please sign in below</p>
                <br/>
                <form onSubmit={handleSubmit}>
                    <label for="email" className={styles.labels}>Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.inputField} required />

                    <br/>

                    <label for="password" className={styles.labels}>Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.inputField} required />

                    <button type="submit" className={styles.button}>Sign In</button>


                </form>

                <div className={styles.linkDiv}>
                    <Link className={styles.link} to="/sign-up">Don't have an acount? Sign up here!</Link>
                    <br/>
                    <Link className={styles.link} to="/forgot-password">Forgot Password? </Link>
                </div>
                <p className={styles.errorMessage}>{errorMessage}</p>

            </div>

        </div>
    );
}

export default SignIn;