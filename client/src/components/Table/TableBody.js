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
          <img src={spotifyCover} alt=""></img>
        </td>
        <td className={styles.text}>{album}</td>
        <td className={styles.text}>{artist}</td>
        <td>
        <a className={styles.playbtn} href={spotifyLink}></a>
        </td>
      </tr>
    )
}

export default TableBody