import styles from '../Style-Modules/Car.module.css';
import temp from '../assets/temp.png';
function Car(props){
    const car=props.car;
    return(
        <div className={styles.gridContainer}>
            <div className={styles.car}>
                <div className={styles.carImage}>
                    <img className={styles.carImg} src={temp}/>

                </div>

                <div className={styles.carInfo}>
                    <p>{car.carMake}</p>
                    <p>{car.carModel}</p>
                    <p>{car.carYear}</p>
                    
                </div>

                <div className={styles.select}>
                    <button>select</button>
                    
                </div>
            </div>

        </div>
    )
}

export default Car;