import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button'
import TableBody from "./TableBody";

import styles from "../Table/ContainerExample.module.css";

function ContainerExample({allSpotifyLinks}) {

  return (
    <div className={styles.container}> 
    <h4>Check on Spotify our last added records...</h4>
      <Table striped bordered hover variant="dark" allSpotifyLinks={allSpotifyLinks}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
        {allSpotifyLinks.map(x => <TableBody key={x._id}{...x}/>)}
        </tbody>
      </Table>
    </div>
  );
}

export default ContainerExample;
