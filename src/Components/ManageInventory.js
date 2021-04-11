import styles from '../Style-Modules/ManageInventory.module.css';
import { useState, useEffect } from 'react';
import logo from '../assets/rentiq.png';
import {useHistory } from 'react-router-dom';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { useAuth } from '../context/AuthContext';
import CarAll from './CarAll';

function ManageInventory() {
    const history = useHistory();
    const [page,setPage]=useState("");

    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const db = firebase.firestore();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setLoading(false);
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars); //get the cars of the business
                console.log(cars);
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
                    <img src={logo} alt="rentiq logo" className={styles.logoImg} />
                </div>

                <div className={styles.add}>
                    <button className={styles.addButton} onClick={() => { history.push('/add-car') }}>+</button>

                </div>
            </div>

            <div className={styles.navbar}>
                <select value={page} onChange={(e) => setPage(e.target.value)}>
                    <option value="allcars">All Cars</option>
                    <option value="reserved">Rented Cars</option>
                    <option value="rented">Reserved Cars</option>
                    <option value="maintenance">In maintenance</option>
                </select>

            </div>

            <div className={styles.results}>
            {cars.map((car) => ( //for each person in people, do the following
                    <CarAll car={car} />
                ))}

            </div>

        </div>

    )
}

export default ManageInventory;