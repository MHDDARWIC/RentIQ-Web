import React,{useState} from "react";
import {Link,useHistory} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import styles from '../Style-Modules/Home.module.css';
import logo from '../assets/rentiq.png';

function Home(){
    const {currentUser,signout} =useAuth();
    const history=useHistory();

    async function handleSignOut(){
        try{
            await signout();
            history.push('/sign-in'); 
        } catch{
            
        }

    }

    

    return(
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
            <img src={logo} alt="rentiq logo" className={styles.logoImg}/>
            </div>
            

            <div className={styles.info}>
                <p>{currentUser.email}</p>
                <button onClick={handleSignOut}>Sign Out</button>
                <button>Edit Profile</button>
            </div>

            <div className={styles.dashboard}>

            </div>

            <div className={styles.menu}>
                <button className={styles.menuButtons} onClick={() => {history.push('/rent-info')}}>Rent</button>
                <button className={styles.menuButtons} onClick={() => {history.push('/reserve-info')}}>Reserve</button>
                <button className={styles.menuButtons}>Manage Inventory</button>
                <button className={styles.menuButtons}>Manage Rentals</button>
                <button className={styles.menuButtons}>Manage Reservations</button>
                <button className={styles.menuButtons}>Statistics</button>

            </div>

            <div className={styles.reservations}>

            </div>

            <div className={styles.returns}>
                
            </div>

            
        

        </div>
        


    );
}

export default Home;