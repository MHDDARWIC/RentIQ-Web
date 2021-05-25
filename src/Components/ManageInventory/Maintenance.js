import styles from '../../Style-Modules/ManageInventoryStyles/Maintenance.module.css';
import logo from '../../assets/rentiq.png';
import divider from '../../assets/divider.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { useAuth } from '../../context/AuthContext';
import InventoryCar from './InventoryCar';
import { Link, useHistory } from 'react-router-dom';
import MaintenanceCar from './MaintenanceCar';

function Maintenance(){
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const db = firebase.firestore();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setLoading(false);
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                break;
            } else {
                setLoading(true);
            }
        }
    })

    return loading ? (
        <div>
            <p>Loading...</p>
        </div>
    ) : (
        <div className={styles.gridContainer}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo} className={styles.logoImg} alt="rentiq logo" />
                    <p className={styles.titleText}>Maintenance</p>
                    <img src={divider} className={styles.dividerStyle} alt="a horizontal divider"/>
                </div>

                <div className={styles.title}>
                </div>
            </div>

            <div className={styles.cars}>
                {cars.map((car) => (car.needMaintenance==true) ? (
                        <MaintenanceCar car={car} />
                    ) : (console.log('removed')))}
            </div>


        </div>
    )
}

export default Maintenance;