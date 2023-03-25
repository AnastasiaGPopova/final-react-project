import styles from "../Homepage/Homepage.module.css";
import { useNavigate } from "react-router-dom";
import Record from "../SingleRecord/Record";
import {useEffect, useState } from "react";
import * as data from '../../api/data';
import { useContext } from "react";
import {RecordContext } from "../../contexts/RecordContext";
import Spinner from "../../utils/Spinner";
import * as spotify from '../../api/api_spotify';
import ContainerExample from '../Table/ContainerExample'


function Homepage() {
  const {loading , setLoading} = useContext(RecordContext)
  const navigation = useNavigate();
  const [allSpotifyLinks, setSpotifyLinks] = useState([])
  const [lastAddedRecords, setLastAddedRecords] = useState([])



  useEffect(()=> {
    async function getRecs(){
      setLoading(true)
      const response = await data.getRecords()
      setSpotifyLinks([])
      setLoading(false)
      setLastAddedRecords(response.slice(0,4))
    }
    getRecs()
  },[setLoading])


  useEffect(() => {
    
    lastAddedRecords.forEach(element => {
        async function getSpot(){
        const res =  await spotify.getRequestSpotify(element.recordName)
        console.log(res)
        const newRecordLink = {
          _id: element._id,
          album: element.recordName,
          artist: (res.albums.items[0].artists > 0 ? 
            res.albums.items[0].artists[0].name + "  " + res.albums.items[0].artists[1].name
            : res.albums.items[0].artists[0].name),
          spotifyLink: res.albums.items[0].external_urls.spotify,
          spotifyCover: res.albums.items[0].images[0].url
        }
        setSpotifyLinks(state => [...state, newRecordLink])
        }
        getSpot()
      });
  }, [lastAddedRecords])

  console.log(allSpotifyLinks)

  return (
    loading ? (<Spinner loading={loading}/>) :
    (
    <main>
      <div className={styles.row1}>
      {lastAddedRecords.length!==0 && (
      <ContainerExample allspotifylinks={allSpotifyLinks}/>)}
        <div className={styles.col2}>
        {lastAddedRecords.length===0 && (
            <div className={styles.norecord}>
              <h2 className={styles.norecord}>
                There are no records reviews added yet...
              </h2>
              <br/>
              <br/>
              <br/>
              <button className={styles.createbutton} type="button" onClick={() => navigation('/create')}>
                <span className={styles.noentries}></span> CREATE NOW{" "}
              </button>
            </div>
          )}

        </div>
        <div className={styles.col}>
          {lastAddedRecords.map(x => <Record key={x._id}{...x}/>)}
        </div>
      </div>
      <div className={styles.row2}>
        <div className={styles.col}>
          <h1>RECORD ME</h1>
          <p>
            Show your passion for vinyl records to the wolrd. Share your
            collection and get in touch with other vinyl lovers.
          </p>
          <div className={styles.buttonPosition}>
            <button
              className={styles.homebutton}
              type="submit"
              onClick={() => navigation('/catalog')}
            >
              {" "}
              <span className={styles.home} /> SEE CATALOG{" "}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
  )

}

export default Homepage;
