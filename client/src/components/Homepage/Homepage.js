import styles from "../Homepage/Homepage.module.css";
import { useNavigate } from "react-router-dom";
import Record from "../SingleRecord/Record";
import { useContext, useEffect, useState } from "react";
import {RecordContext } from "../../contexts/RecordContext";
import * as data from '../../api/data';

function Homepage() {
  const navigation = useNavigate();
  const [homeRecords, setHomeRecords] = useState([])

  useEffect(()=> {
    async function getRecs(){
      const response = await data.getRecords()
      setHomeRecords(response)
    }
    getRecs()
  })


  function seeCatalog() {
    navigation("/catalog");
  }


let lastAddedRecords = homeRecords.slice(0,4)


  return (
    <main>
      <div className={styles.row}>
        <div className={styles.col}></div>
        <div className={styles.col}>
          {lastAddedRecords===null && (
            <div className={styles.norecord}>
              <h2 className={styles.norecord}>
                There are no records reviews found yet...
              </h2>
              <button className={styles.createbutton} type="button">
                <span className={styles.noentries}></span> CREATE NOW{" "}
              </button>
            </div>
          )}

          

                  {/* ---------- if no records, show this div ---------- */}

                {lastAddedRecords.length === 0 &&
                  <div className={styles.norecord}>
                    <h2 className={styles.norecord}>There are no records reviews found yet...</h2>
                    <button className={styles.createbutton} type="button"
                            onClick={() => navigation('/create')}>
                            <span className={styles.noentries}></span> CREATE NOW </button>   
                  </div>
                }

          {lastAddedRecords.map(x => <Record key={x._id}{...x}/>)}


          {/* <div className={styles.record}>
                      <h5>Nat King Cole</h5>
                      <p>Album: Cole Español</p>
                      <img src="https://upload.wikimedia.org/wikipedia/en/8/86/NatKingCole_Unforgettable_Capitol10inch.jpg" alt=""/>
                      <div className={styles.center}>
                          <a href="#" className={styles.text}><span />Details</a>
                      </div>
                  </div> */}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <h1>RECORD ME</h1>
          <p>
            Show your passion for vinyl records to the wolrd. Share your
            collection and get in touch with other vinyl lovers.
          </p>
          <div>
            <button
              className={styles.homebutton}
              type="submit"
              onClick={seeCatalog}
            >
              {" "}
              <span className={styles.home} /> SEE CATALOG{" "}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
