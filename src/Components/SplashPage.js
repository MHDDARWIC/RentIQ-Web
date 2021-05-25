import styles from '../Style-Modules/SplashPage.module.css';
import logo from '../assets/rentiq.png';
import { Link } from 'react-router-dom';
import {splash} from '../assets/splash.jpg';

function SplashPage(){

    return(
        <div className={styles.gridContainer}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo} alt="rentiq logo" className={styles.logoImg}/>
                </div>

                <div className={styles.info}>
                </div>

            </div>

            <div className={styles.main}>
                <div className={styles.choice}>
                    <p className={styles.infoText} style={{fontSize:'30px'}}>Welcome to RentIQ!</p>
                    <p className={styles.infoText}>RentIQ is a complete platform made for car rental businesses.</p>
                    <p className={styles.infoText}>Rent, Reserve, Manage your inventory and much more!</p>
                    <p className={styles.infoText}>Select an option below to start using RentIQ!</p>

                    <button className={styles.buttons} style={{backgroundColor:'#7aeb68c7'}}>Sign In</button>
                    <button className={styles.buttons} style={{backgroundColor:'#28f5fc'}}>Register</button>
                </div>
                
            </div>

            <div className={styles.footer}>
                <p style={{textAlign:'center',color:'white'}}>Made By: Mohamad Darwiche</p>
            </div>
        </div>
    )

}

export default SplashPage;