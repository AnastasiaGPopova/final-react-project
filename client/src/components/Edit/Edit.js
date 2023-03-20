import { useEffect, useState } from "react";
import styles from "../Create/Create.module.css";
import * as data from '../../api/data';
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {RecordContext } from "../../contexts/RecordContext";



function Edit() {
    const {recordId} = useParams()
    const navigate = useNavigate()
    const {setErrorMessages, setRecords, setIsChanged, errorMessages, isOwner} = useContext(RecordContext)

    if(!isOwner){
      navigate('/')
    }

    const [genres, setGenres] = useState({});
    const [recordValues, setRecordValues] = useState({})


      useEffect(() => {
        async function getCurrent(){
            const response = await data.getItemById(recordId)
            setRecordValues(response)
            console.log(response)
            for(const key of response.genre.split(", ")){
                setGenres({[key]: true})
              }
        }
        getCurrent()
    }, [recordId])



      const onChangeHandler = (e) => {
        setRecordValues(state => ({...state, [e.target.name]: e.target.value}));
    };

      const onGenresChange = (e) => {
        setGenres(state => ({...state, [e.target.id]: e.target.checked}));
    }
      
      const onSubmitHandler = async (e) => {
        e.preventDefault()
        let realGenre = []

        for(const key of Object.keys(genres)){
          console.log(genres.key)
          if(genres[key] === true){
            realGenre.push(key)
          }
        }
        realGenre = realGenre.join(", ")

        const body = {
          recordName : recordValues.recordName,
          artist: recordValues.artist,
          year: recordValues.year,
          imageUrl: recordValues.imageUrl,
          description: recordValues.description,
          rpm: recordValues.rpm,
          genre: realGenre,
        }

        
          const response = await data.editRecord(recordId, body);
      
          if (response.hasOwnProperty("errors")) {
            setErrorMessages(response.message.join(', '))
            setTimeout(()=> {
              setErrorMessages(null)
            },3000)
          } else {
            setRecords(state => [...state, response]);
            setErrorMessages(null)
            setIsChanged(response)
            navigate(`/records/${recordId}`)
          }
      };

  return (
    <div className={styles.hero}>
      {errorMessages && (
              <div className={styles.errorMsg}>
              <h1> Error Message:</h1>
              <p>{errorMessages}</p>
            </div>
      )}

      <form>
        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Record Name:</label>
          <input
            className={styles.registerboxInput}
            type="text"
            id="recordName"
            name="recordName"
            placeholder="Write you record name..."
            value={recordValues.recordName || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Artist:
          </label>
          <input
            className={styles.registerboxInput || ""}
            type="text"
            id="artist"
            name="artist"
            placeholder="Write you record name..."
            value={recordValues.artist || ""}
            onChange={onChangeHandler}
          />
        </div>
        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Year:</label>
        <input
            className={styles.registerboxInput}
            type="text"
            id="year"
            name="year"
            placeholder="Write the year..."
            value={recordValues.year || ""}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Image Url:</label>
          <input
            className={styles.registerboxInput}
            type="text"
            id="imageurl"
            name="imageUrl"
            placeholder="Write the image url..."
            value={recordValues.imageUrl || ""}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">
            <i className="fa-solid fa-envelope" /> Description:
          </label>
          <textarea
            className={styles.registerboxInputDescription}
            type="text"
            id="description"
            name="description"
            placeholder="Write description..."
            value={recordValues.description || ""}
            onChange={onChangeHandler}
          />
        </div>

        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">{" "}RPM:</label>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="PRM33">33</label>
            <input className="radioInput" type="radio" id="PRM33" name="rpm" 
            value="33"
            onChange={onChangeHandler}
            checked={recordValues.rpm === "33" || false}
            />
          </div>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="PRM33">45</label>
            <input className="radioInput" type="radio" id="PRM33" name="rpm"
            value="45"
            onChange={onChangeHandler}
            checked={recordValues.rpm === "45" || false}
            />
          </div>

        </div>


        <div className={styles.registerbox}>
          <label className={styles.registerboxLabels} htmlFor="text">{" "}Genre:</label>
          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="genre">Rock</label>
            <input className="radioInput" type="checkbox" id="rock" name="genre" 
            onChange={onGenresChange}
            checked={genres["rock"] || false}
            
            />
          </div>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="genre">Jazz</label>
            <input className="radioInput" type="checkbox" id="jazz" name="genre" 
            onChange={onGenresChange}
            checked={genres["jazz"] || false}
            />
          </div>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="genre">Pop</label>
            <input className="radioInput" type="checkbox" id="pop" name="genre" 
            onChange={onGenresChange}
            checked={genres["pop"] || false}
            />
          </div>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="genre">Alternative</label>
            <input className="radioInput" type="checkbox" id="alternative" name="genre" 
            onChange={onGenresChange}
            checked={genres["alternative"] || false}
            />
          </div>
        </div>
        <button className={styles.submitButton}  type="button" onClick={onSubmitHandler}><span></span>EDIT RECORD </button>
      </form>
    </div>
  );
}

export default Edit;
