
import styles from "../SingleRecord/Record.module.css";
import { Link } from 'react-router-dom';



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
            <Link to={`/records/${_id}`} className={styles.text}>
                <span />
                Details
            </Link>
        </div>
    </div>
    )
}
export default Record