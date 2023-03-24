import styles from "../Table/TableBody.module.css";
import { Link } from "react-router-dom";

function TableBody({
    _id,
    album,
    artist,
    spotifyLink,
    spotifyCover,
  }){


    return(
        <tr>
        <td>
          <img src={spotifyCover} alt={album}></img>
        </td>
        <td className={styles.text}>{album}</td>
        <td className={styles.text}>{artist}</td>
        <td>
        <Link className={styles.playbtn} to={spotifyLink}></Link>
        </td>
      </tr>
    )
}

export default TableBody