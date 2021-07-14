import styles from '../../Style-Modules/ManageInventoryStyles/ManageInventory.module.css';
import logo from '../../assets/rentiq.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { useAuth } from '../../context/AuthContext';
import InventoryCar from './InventoryCar';
import { Link, useHistory } from 'react-router-dom';

function ManageInventory() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();

    const db = firebase.firestore();

    useEffect(() => {
        console.log("rendered");
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                setLoading(false);
                break;
            } else {
                setLoading(true);
            }
        }
    })

    return loading ? (
        <div>
            <p style={{color:'white'}} >Loading...</p>
        </div>
    ) : (
        <div className={styles.gridContainer}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img src={logo} className={styles.logoImg} alt="rentiq logo" onClick={() => { history.push('/') }}/>
                </div>

                <div className={styles.title}>
                    <p className={styles.titleText}>Manage Inventory</p>
                    <p className={styles.titleText} style={{fontSize:'20px'}}>Inventory Capacity: {currentDoc.value.inventoryCapacity}</p>
                </div>
            </div>

            <div className={styles.buttons}>
                <div className={styles.bOne}>
                    <button className={styles.headerButtons} style={{backgroundColor:'#66ffa877'}} onClick={() => {history.push('/add-car')}}>Add a New Car</button>
                </div>
                
                <div className={styles.bTwo}>
                    <button className={styles.headerButtons} style={{backgroundColor:'#7fdbff96'}} onClick={() => {history.push('/maintenance')}}>Maintenance</button>
                </div>
                

                <div className={styles.bThree}>
                    <button className={styles.headerButtons} style={{backgroundColor:'#ff40369f'}} onClick={() => {history.push('/dnl')}}>Do not Rent List</button>
                </div>


            </div>

            <div className={styles.cars}>
                {cars.map((car) => (car.needMaintenance==false && car.available==true) ? (
                        <InventoryCar car={car} />
                    ) : (console.log('removed')))}
            </div>


        </div>
    )

}

export default ManageInventory;
