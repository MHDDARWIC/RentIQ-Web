import styles from '../Style-Modules/DNLWarning.module.css';
import logo from '../assets/rentiq.png';
import warning from '../assets/warning.png';
import {useHistory } from 'react-router-dom';


function DNLWarning() {
    const history = useHistory();

    return (
        <div className={styles.gridContainer}>
            <div className={styles.header}>
                <img src={logo} className={styles.logoImg} alt="rentiq logo" />
            </div>

            <div className={styles.main}>
                <img src={warning} className={styles.warning} alt="warning sign" />
                <p className={styles.pStyle} style={{fontSize:'60px'}}>Rental Failed</p>
                <p className={styles.pStyle} style={{position:'relative','bottom':'30px'}}>The person renting is on your Do Not Rent List</p>
                <button className={styles.button} onClick={() => { history.push('/') }}>Home</button>
            </div>

        </div>
    )
}

export default DNLWarning;