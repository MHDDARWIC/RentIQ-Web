import styles from '../../Style-Modules/ManageInventoryStyles/InventoryCar.module.css';
import divider from '../../assets/dividervertical.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { FiTool } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai';

function InventoryCar(props) {
    const car = props.car;
    const [cars, setCars] = useState("");
    const [carKey, setCarKey] = useState(0);
    const [currentDoc, setCurrentDoc] = useState("");
    const db = firebase.firestore();
    const [documents] = useGetData();
    const { currentUser } = useAuth();
    const history = useHistory();
    const [load, setLoad] = useState("");

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
                setCars(documents[j].value.cars);
                break;
            }
        }
    })

    async function handleAddMaintenance(e) {
        e.preventDefault();

        if (car.isRented == true){
            alert("The Car is currently rented. Cannot add to maintenance untill car is returned");
        }
        else if (car.isReserved == true) {
            alert("The car is currently reserved. Please cancel the reservation in order to add the car to maintenance.");
        }
        else {
            db.collection("businesses")
                .doc(currentDoc.id)
                .update({
                    tempKey: car.key
                })
                .then(function () {
                    console.log("Car selection successfull!");
                    history.push('/add-maintenance');
                })
                .catch(function (error) {
                    console.error("Error writing Value: ", error);
                    //navigate to failure screen 
                });
        }



    }

    async function handleAllInfo(e) {
        e.preventDefault();

        db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                tempKey: car.key

            })
            .then(function () {
                console.log("Car selection successfull!");
                history.push('/all-info');
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);
                //navigate to failure screen 
            });

    }

    async function handleDelete(e) {
        e.preventDefault();
        if (car.isRented == true){
            alert("The Car is currently rented. Cannot delete untill car is returned");
        }
        else if (car.isReserved == true) {
            alert("The car is currently reserved. Please cancel the reservation in order to delete the car");
        } else{
            cars[car.key].available = false;
            console.log(cars[car.key].available);
            db.collection("businesses")
                .doc(currentDoc.id)
                .update({
                    cars: cars,
                })
                .then(function () {
                    window.location.reload();
                })
                .catch(function (error) {
                    console.error("Error writing Value: ", error);
                });
        }
        

    }

    return (
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
                        <p className={styles.carInformation}>VIN: {car.vin}</p>
                        <p className={styles.carInformation}> {car.bodyClass} - {car.doors} Doors </p>
                        <p className={styles.carInformation}>Color: {car.color}</p>
                        <p className={styles.carInformation}>Mileage: {car.mileage} Miles</p>
                        <p className={styles.carInformation}>Rate: $ {car.rate}</p>
                    </div>
                </div>

                <div className={styles.icons}>
                    <button className={styles.iconStyle} onClick={handleAddMaintenance}><FiTool /></button>
                    <button className={styles.iconStyle} onClick={handleDelete}><AiFillDelete /></button>
                    <button className={styles.iconStyle} onClick={handleAllInfo}><BsThreeDots /></button>


                </div>
            </div>
        </div>
    )
}

export default InventoryCar;