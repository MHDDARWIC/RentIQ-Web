import styles from '../Style-Modules/CarAll.module.css';
import temp from '../assets/temp.png';

function CarAll(props){
    const car=props.car;
    return(
        <div className={styles.gridContainer}>
            <div className={styles.car}>
                <div className={styles.image}>
                    <img src={temp} className={styles.carImg}/>
                </div>

                <div className={styles.info}>
                    <p> {car.carMake} {car.carModel} {car.carYear} </p>
                    <p> MPG:  </p>
                    <p> Rate:  </p>
                    <p> Status </p>

                </div>

                <div className={styles.maintenance}>
                    <button>Requires Maintenance</button>
                    
                </div>

                <div className={styles.remove}>
                    <button>Remove from inventory</button>
                </div>
            </div>

        </div>
    )
}

export default CarAll;