import styles from '../Style-Modules/CarAddFailure.module.css';
import logo from '../assets/rentiq.png';
import failure from '../assets/failure.png';

function CarAddFailure(){

    return(
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
                <img src={logo} alt="rentiq logo" className={styles.logoImg}/>
            </div>

            <div className={styles.fail}>
                <img src={failure} alt="failure icon" className={styles.failureIcon}/>
                <p className={styles.failureTitle}>Cannot add the car</p>
                <p className={styles.failureDesc}>The inventory is full. To update the capacity, please go to your account settings.</p>
                <button className={styles.buttons}>Return to Homescreen</button>
                <button className={styles.buttons}>To Account Settings</button>
            </div>

        </div>


    );
}

export default CarAddFailure;