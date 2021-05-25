import styles from '../Style-Modules/ReturningCar.module.css';
import divider from '../assets/dividervertical.png';

function ReturningCar(props){
    const car = props.car;
    return(
        <div className={styles.gridContainer}>
            <div className={styles.car}>
                <div className={styles.title}>
                <p className={styles.titleStyle}>{car.carMake} {car.carModel} {car.carYear}</p>

                </div>

                <div className={styles.main}>
                    <div className={styles.carLogo}>
                    <img src={car.carImg} alt="logo of the car" className={styles.carImg} />

                    </div>

                    <div className={styles.divider}>
                    <img src={divider} alt="a vertical divider" className={styles.dividerStyle} />
                        
                    </div>

                    <div className={styles.carInfo}>
                        <p className={styles.carInformation}>Returning at:  {car.renterReturnTime}</p>
                        <p className={styles.carInformation}>Rented By: {car.currentRenterName} </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ReturningCar;