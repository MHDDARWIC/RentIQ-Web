import styles from '../../Style-Modules/ManageInventoryStyles/DNL.module.css';
import logo from '../../assets/rentiq.png';
import { useState, useEffect } from 'react';
import firebase from "firebase";
import { useGetData } from "../../useGetData";
import { useAuth } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import divider from '../../assets/divider.png';
import {AiFillPlusCircle} from 'react-icons/ai';
import DLNumber from './DLNumber';

function DNL() {
    const { currentUser } = useAuth();
    const [documents] = useGetData();
    const [currentDoc, setCurrentDoc] = useState("");
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const [list,setList]=useState();
    const [newDL,setNewDL]=useState("");

    const db = firebase.firestore();

    useEffect(() => {
        for (var j = 0; j < documents.length; j++) {
            if (documents[j].value.email === currentUser.email) {
                setLoading(false);
                setCurrentDoc(documents[j]);
                setList(documents[j].value.doNotRentList);
                break;
            } else {
                setLoading(true);
            }
        }
    })

    async function handleAdd(e){
        e.preventDefault();
        if(newDL.length==0){
            setErrorMessage("Please Enter A Value");
        } else{
            list.push(newDL);

            db.collection("businesses")
            .doc(currentDoc.id)
            .update({
                doNotRentList: list
            })
            .then(function () {
                console.log("Value Added");
                history.push('/manage-inventory');
            })
            .catch(function (error) {
                console.error("Error writing Value: ", error);
                setErrorMessage("Error - Cannot Add Value");
            });
        }
    }

    return loading ? (
        <div>
            <p>Loading...</p>
        </div>
    ) : (
        <div className={styles.gridContainer}>
            <div className={styles.logo}>
                <img src={logo} alt="the rentiq logo" className={styles.logoImg}/>
            </div>

            <div className={styles.title}>
                <p className={styles.titleStyle}>Do not rent list</p>
            </div>

            <div className={styles.main}>
                <div className={styles.add}>
                    <input type="text" id="newDL" value={newDL} onChange={(e) => setNewDL(e.target.value)} className={styles.input} required/>
                    <button className={styles.button} onClick={handleAdd}>+</button>
                    <p style={{color:'red',textAlign:'center'}}>{errorMessage}</p>
                </div>

                <div className={styles.results}>
                    {list.map((num) => (
                        <DLNumber num={num} />
                    ))}
                </div>

            </div>
        </div>
    )

}

export default DNL;