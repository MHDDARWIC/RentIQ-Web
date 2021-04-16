import styles from '../Style-Modules/CarAll.module.css';
import {Link} from 'react-router-dom';

function CarAll(props){
    const car=props.car;
    return(
        <div className={styles.gridContainer}>
            <div className={styles.car}>
                <div className={styles.image}>
                <p style={{fontSize:'20px'}} className={styles.infoText}> {car.carMake} {car.carModel} {car.carYear} </p>
                    <img src={car.carImg} className={styles.carImg}/>
                </div>

                <div className={styles.info}>
                    
                    <p className={styles.infoText} > Rate: ${car.rate} per day </p>
                    <p className={styles.infoText}> Mileage: {car.mileage} mi</p>
                    <p className={styles.infoText}>Color: {car.color}  </p>
                    <p className={styles.infoText}> Status: {car.isRented.toString()} </p>
                    <Link style={{textAlign:'center'}}>View More information</Link>

                </div>

                <div className={styles.maintenance}>
                    <button className={styles.buttons}>Requires Maintenance</button>
                </div>

                <div className={styles.remove}>
                    <button className={styles.buttons}>Remove from inventory</button>
                </div>
            </div>

        </div>
    )
}

export default CarAll;