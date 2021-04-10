import styles from '../Style-Modules/CarAddSuccess.module.css';
import logo from '../assets/rentiq.png';
import success from '../assets/success.png';

function CarAddSuccess(){

    return(
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
                <img src={logo} alt="rentiq logo" className={styles.logoImg}/>
            </div>

            <div className={styles.success}>
                <img src={success} alt="success icon" className={styles.successIcon}/>
                <p className={styles.successTitle}>Car Added Successfully!</p>
                <button className={styles.buttons}>Return to Homescreen</button>
                <button className={styles.buttons}>Manage Inventory</button>
            </div>

        </div>


    );
}

export default CarAddSuccess;