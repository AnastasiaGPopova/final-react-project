
import styles from "../SingleRecord/Record.module.css";



function Record ({
    recordName,
    artist,
    imageUrl,
    _id
}){



    return(

        <div className={styles.record}>
        <h5>{artist}</h5>
        <p>Album: {recordName}</p>
        <img
            src={imageUrl}
            alt=""
        />
        <div className={styles.center}>
            <a href={`/records/${_id}`} className={styles.text}>
                <span />
                Details
            </a>
        </div>
    </div>
    )
}
export default Record