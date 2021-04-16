import styles from '../Style-Modules/Car.module.css';
import temp from '../assets/temp.png';
import { useState,useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../useGetData";
import { useAuth } from '../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';


function Car(props){
    const car=props.car;
    const [carKey,setCarKey]=useState(0);
    const [currentDoc, setCurrentDoc] = useState("");
    const db = firebase.firestore();
    const [documents] = useGetData();
    const { currentUser } = useAuth();
    const history = useHistory();


    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setCurrentDoc(documents[j]);
            } 
        }
    })

    async function handleSelection(e){
        e.preventDefault();

        db.collection("businesses")
        .doc(currentDoc.id)
        .update({
            tempKey: car.key
        })
        .then(function () {
            console.log("Car selection successfull!");
            history.push('/rent-confirmation');
        })
        .catch(function (error) {
            console.error("Error writing Value: ", error);
            //navigate to failure screen 
        });
        
    }

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
                    <button onClick={handleSelection}>select</button>
                    
                </div>
            </div>

        </div>
    )
}

export default Car;