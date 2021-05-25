import styles from '../../Style-Modules/ManageInventoryStyles/DLNumber.module.css';
function DLNumber(props){
    const num = props.num;

    return(
        <p className={styles.num}>{num}</p>
    )
}

export default DLNumber;