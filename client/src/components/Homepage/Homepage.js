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
  const {loading , setLoading, records} = useContext(RecordContext)
  const navigation = useNavigate();
  const [homeRecords, setHomeRecords] = useState([])
  const [allSpotifyLinks, setSpotifyLinks] = useState([])

  useEffect(()=> {
    async function getRecs(){
      setLoading(true)
      const response = await data.getRecords()
      setHomeRecords(response)
      setLoading(false)
    }
    getRecs()
  },[setLoading])

  useEffect(() => {
    
    homeRecords.forEach(element => {
        async function getSpot(){
        const res =  await spotify.getRequestSpotify(element.recordName)
        // console.log(res.albums.items[0].external_urls.spotify)
        // console.log(res)
        // console.log(res.albums.items[0].images[0].url)
        const newRecordLink = {
          album: element.recordName,
          artist: element.artist,
          spotifyLink: res.albums.items[0].external_urls.spotify,
          spotifyCover: res.albums.items[0].images[0].url
        }
        setSpotifyLinks(state => [...state, newRecordLink])
        }
        getSpot()
      });
    // external_urls
    // "https://open.spotify.com/album/5ahEd7berYIgjRYsIHZa8Y"

  }, [homeRecords])

  console.log(allSpotifyLinks)


let lastAddedRecords = homeRecords.slice(0,4)


  return (
    loading ? (<Spinner loading={loading}/>) :
    (
    <main>
      <div className={styles.row1}>
      <ContainerExample/>
        <div className={styles.col2}>
        {lastAddedRecords.length===0 && (
            <div className={styles.norecord}>
              <h2 className={styles.norecord}>
                There are no records reviews found yet...
              </h2>
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
