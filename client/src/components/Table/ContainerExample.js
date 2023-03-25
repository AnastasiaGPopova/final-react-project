import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import TableBody from "./TableBody";

import styles from "../Table/ContainerExample.module.css";

function ContainerExample({allspotifylinks}) {

  return (
    <div className={styles.container}> 
    <h4>Check our last added records on <img src="./images/Spotify1.png" alt="" />Spotify: </h4>
      <Table striped bordered hover variant="dark" allspotifylinks={allspotifylinks}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
        {allspotifylinks.map(x => <TableBody key={x._id}{...x}/>)}
        </tbody>
      </Table>
    </div>
  );
}

export default ContainerExample;
