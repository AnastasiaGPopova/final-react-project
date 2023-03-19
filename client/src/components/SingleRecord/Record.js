
import styles from "../SingleRecord/Record.module.css";
import { Link } from 'react-router-dom';



function Record ({
    recordName,
    artist,
    imageUrl,
    _id,
    likes,
   _ownerId,
    createdAt
}){

    let newDate = new Date(createdAt).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric",  hour: 'numeric', minute: 'numeric'})

    return(

        <div className={styles.record}>
        <h5>{artist}</h5>
        <p>Album: {recordName}</p>
        <img
            src={imageUrl}
            alt=""
        />
        <p>Likes: {likes}</p>
        <p>Created on: {newDate}</p>
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