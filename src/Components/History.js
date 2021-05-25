import styles from '../Style-Modules/History.module.css';
import logo from '../assets/rentiq.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { useAuth } from '../context/AuthContext';
import EarningI from './EarningI';
import { Link, useHistory } from 'react-router-dom';
function History() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const [earnings, setEarnings] = useState([])
    const [totalEarnings, setTotalEarnings] = useState(0);

    const db = firebase.firestore();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
                setEarnings(documents[j].value.earnings); //get the cars of the business
                if (earnings.length >= 0) {
                    setLoading(false);
                    break;
                }
                else {
                    setLoading(true);
                }
            } else {
                setLoading(true);
            }
        }

    })


    return (

        <div className={styles.gridContainer}>
            <div className={styles.header}>
                <img src={logo} alt="rentiq logo" className={styles.logoImg} />
                <p className={styles.titleStyle}>History and Earnings</p>
            </div>

            <div className={styles.main}>
                {earnings.map((earning) => (earning.action != "") ? (
                    <EarningI earning={earning} />
                ) : (console.log('removed')))}
            </div>
        </div>

    )

}

export default History;