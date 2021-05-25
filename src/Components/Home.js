import React from "react";
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../Style-Modules/Home.module.css';
import logo from '../assets/rentiq.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { Bar, Doughnut } from 'react-chartjs-2';
import { FiLogOut } from 'react-icons/fi';

function Home() {
    const { currentUser, signout } = useAuth();
    const history = useHistory();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [cars, setCars] = useState("");
    const [loading, setLoading] = useState(true);
    const [carLabels, setCarLabels] = useState([]);
    const [rentalTimesData, setRentalTimesData] = useState([]);
    const [finalLabels, setFinalLabels] = useState([]);
    const [finalTimes, setFinalTimes] = useState([]);
    const [rentedCarsNum, setRentedCarsNum] = useState();
    const [maintenanceNum, setMaintenanceNum] = useState();
    const [reservedCarsNum, setReservedCarsNum] = useState();

    var chartData = {
        labels: finalLabels,
        datasets: [{
            label: 'rental times',
            data: finalTimes,

        }],
    }

    var doughnutDataR = {
        datasets: [{
            data: [rentedCarsNum, (finalLabels.length - rentedCarsNum)],
            backgroundColor: ['#00fa9a96', 'grey']
        }],
    }

    var doughnutDataM = {
        datasets: [{
            data: [maintenanceNum, (finalLabels.length - maintenanceNum)],
            backgroundColor: ['#00fa9a96', 'grey']
        }],
    }

    var doughnutDataRes = {
        datasets: [{
            data: [reservedCarsNum, (finalLabels.length - reservedCarsNum)],
            backgroundColor: ['#00fa9a96', 'grey']
        }],
    }

    const db = firebase.firestore();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);

                setCars(documents[j].value.cars); //get the cars of the business
                console.log(cars)
                if (currentDoc == "" || cars.length < 0) {
                    setLoading(true);
                }
                else {
                    drawBarGraph();
                    drawRentalDoughnut();
                    drawMaintenanceDoughnut();
                    drawReservedDoughnut();
                    setLoading(false);
                    break;
                }
            } else {
                setLoading(true);
            }
        }
    })

    function drawBarGraph() {
        var temp = "";
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].available == true) {
                temp = cars[i].carMake + " " + cars[i].carModel + " " + cars[i].carYear;
                carLabels[i] = temp;
                rentalTimesData[i] = cars[i].rentalTimes;
            }
        }
        setFinalLabels(carLabels);
        setFinalTimes(rentalTimesData);
    }

    function drawRentalDoughnut() {
        var temp = 0;
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].available == true && cars[i].isRented == true) {
                temp++;
            }
        }
        setRentedCarsNum(temp);
    }

    function drawMaintenanceDoughnut() {
        var temp = 0;
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].available == true && cars[i].needMaintenance == true) {
                temp++;
            }
        }
        setMaintenanceNum(temp);
    }

    function drawReservedDoughnut() {
        var temp = 0;
        for (var i = 0; i < cars.length; i++) {
            if (cars[i].available == true && cars[i].isReserved == true) {
                temp++;
            }
        }
        setReservedCarsNum(temp);
    }

    async function handleSignOut() {
        try {
            await signout();
            history.push('/sign-in');
        } catch {

        }
    }

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

                <div className={styles.account}>
                    <p className={styles.accountInfo} style={{ display: 'inline' }}>{currentDoc.value.businessName}</p>
                    <button onClick={handleSignOut} className={styles.signOutButton}><FiLogOut /></button>
                    <p className={styles.accountInfo} style={{ fontSize: '20px' }}>{currentDoc.value.email}</p>


                </div>

            </div>

            <div className={styles.main}>
                <div className={styles.pOne}>
                    <div className={styles.bar}>
                        <p className={styles.carTitlePopularity}>Car Popularity</p>
                        <Bar
                            data={chartData}
                            options={{ backgroundColor: '#00fa9a96', responsive: true, }}
                            style={{ width: '1100px', color: 'white' }}
                        />
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.menuButtons} onClick={() => { history.push('/rent-info') }}>Rent</button>
                        <button className={styles.menuButtons} onClick={() => { history.push('/reserve-info') }}>Reserve</button>
                        <button className={styles.menuButtons} onClick={() => { history.push('/manage-inventory') }}>Manage Inventory</button>
                        <button className={styles.menuButtons} onClick={() => { history.push('/manage-rentals') }}>Manage Rentals</button>
                        <button className={styles.menuButtons} onClick={() => { history.push('/manage-reservations') }}>Manage Reservations</button>
                        <button className={styles.menuButtons} onClick={() => { history.push('/history') }}>History and Earnings</button>
                    </div>
                </div>

                <div className={styles.pTwo}>
                    <div className={styles.wheelOne}>
                        <div className={styles.doughnutGraph}>
                            <p className={styles.doughnutTitle}>Rented: {(rentedCarsNum / finalLabels.length) * 100}%</p>
                            <Doughnut data={doughnutDataR} options={{ responsive: true, maintainAspectRatio: true, }} />
                        </div>
                    </div>

                    <div className={styles.wheelTwo}>
                        <div className={styles.doughnutGraph}>
                            <p className={styles.doughnutTitle}>Maintenance: {(maintenanceNum / finalLabels.length) * 100}%</p>
                            <Doughnut data={doughnutDataM} options={{ responsive: true, maintainAspectRatio: true, }} />
                        </div>
                    </div>

                    <div className={styles.wheelThree}>
                        <div className={styles.doughnutGraph}>
                            <p className={styles.doughnutTitle}>Reserved: {(reservedCarsNum / finalLabels.length) * 100}%</p>
                            <Doughnut data={doughnutDataRes} options={{ responsive: true, maintainAspectRatio: true, }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;


