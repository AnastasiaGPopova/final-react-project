import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button'

import styles from "../Table/ContainerExample.module.css";

function ContainerExample() {
  return (
    <div className={styles.container}> 
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Image</th>
            <th>Album</th>
            <th>Artist</th>
            <th>Play</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src="" alt=""></img>
            </td>
            <td>Mark</td>
            <td>Otto</td>
            <td>
            <Button size="sm">Success</Button>{' '}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ContainerExample;
