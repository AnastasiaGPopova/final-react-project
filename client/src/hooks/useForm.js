import { useState } from "react";
import { useContext } from "react";
import {RecordContext } from "../contexts/RecordContext";
import { useNavigate } from "react-router-dom";
import * as data from "../api/data";



////Original

export const useForm = (initialGenrs, initialRecordValues, command, recordId) =>{
  const navigate = useNavigate()
  const {setErrorMessages, setRecords, setIsChanged, errorMessages} = useContext(RecordContext)
  const [recordValues, setRecordValues] = useState(initialRecordValues);
  const [genres, setGenres] = useState(initialGenrs);



  const onChangeHandler = (e) => {
      setRecordValues((state) => ({ ...state, [e.target.name]: e.target.value }));
    };
  
    const onGenresChange = (e) => {
      setGenres((state) => ({ ...state, [e.target.id]: e.target.checked }));
    };

    const onSubmitHandler = async (e) => {
      e.preventDefault();
      let realGenre = [];
  
      for (const key of Object.keys(genres)) {
        console.log(genres.key);
        if (genres[key] === true) {
          realGenre.push(key);
        }
      }
      realGenre = realGenre.join(", ");
  
      const body = {
        recordName: recordValues.recordName,
        artist: recordValues.artist,
        year: recordValues.year,
        imageUrl: recordValues.imageUrl,
        description: recordValues.description,
        rpm: recordValues.rpm,
        genre: realGenre,
      };
  
      console.log(body)
  
      let response
      if(command === "create"){
          response = await data.createRecord(body);

      } else if (command === "edit")  {
          response = await data.editRecord(recordId, body)

      }      
  
      if (response.hasOwnProperty("errors")) {
        setErrorMessages(response.message.join(", "));
        setTimeout(()=> {
          setErrorMessages(null)
        },3000)
      } else {
        setRecords(state => [...state, response]);
        setErrorMessages(null)
        setIsChanged(response)
        if(command === "create"){
          navigate("/catalog");
      } else if (command === "edit")  {
          navigate(`/records/${recordId}`)
      }    
      }
    };

    return {
      recordValues,
      genres,
      onChangeHandler,
      onGenresChange,
      setRecordValues,
      setGenres,
      errorMessages,
      onSubmitHandler
    }


}