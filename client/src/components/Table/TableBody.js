import styles from "../Table/TableBody.module.css";

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
        <button className={styles.playbtn} onClick={() => window.open(spotifyLink)}></button>
        </td>
      </tr>
    )
}

export default TableBody