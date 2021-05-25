import styles from '../Style-Modules/ReservationSuccess.module.css';
import logo from '../assets/rentiq.png';
import success from '../assets/success.png';
import { Link, useHistory } from 'react-router-dom';


function ReservationSuccess(){
    const history = useHistory();

    return(
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
                <img src={logo} alt="rentiq logo" className={styles.logoImg}/>
            </div>

            <div className={styles.success}>
                <img src={success} alt="success icon" className={styles.successIcon}/>
                <p className={styles.successTitle}>Car Reserved Successfully</p>
                <button className={styles.buttons} onClick={() => { history.push('/') }}>Return to Homescreen</button>
                <button className={styles.buttons} onClick={() => { history.push('/manage-reservations') }}>Manage Reservations</button>
            </div>
        </div>
    );
}

export default ReservationSuccess;