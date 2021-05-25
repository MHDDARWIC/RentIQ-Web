import styles from '../Style-Modules/EarningI.module.css';
function EarningI(props) {
    const earning = props.earning;
    return (
        <div className={styles.gridContainer}>
            <div className={styles.main}>
                <div className={styles.information}>
                    <div className={styles.date}>
                        <p className={styles.dateStyle}>{earning.date}</p>
                    </div>

                    <div className={styles.info}>
                        <p className={styles.infoStyle}> You {earning.action} {earning.carMake} {earning.carModel} {earning.carYear} to {earning.customer}</p>
                    </div>

                    <div className={styles.amount}>
                        <p className={styles.amountStyle}>+${earning.totalEarned}</p>
                    </div>

                </div>

                <div className={styles.divider}>
                    <hr className={styles.hrLine}></hr>
                </div>




            </div>


        </div>
    )
}

export default EarningI;