import "./App.css";

import { Route, Routes } from "react-router-dom";
import * as data from "./api/data";
import { useEffect, useState } from "react";
import {useAuthUser, RequireAuth} from 'react-auth-kit'
import Create from "./components/Create/Create";
import Navigation from "./components/Navigation/Navigation";
import Homepage from "./components/Homepage/Homepage.js";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Catalog from "./components/Catalog/Catalog";
import Footer from "./components/Footer/Footer";
import Details from "./components/Details/Details";
import Edit from "./components/Edit/Edit";
import Profile from "./components/Profile/Profile";
import Error from "./components/Error/Error";
import { RecordContext } from "./contexts/RecordContext";




function App() {
  
  const auth = useAuthUser()
  const [isLogged, setIsLogged] = useState(false);
  const [records, setRecords] = useState([]);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isChanged, setIsChanged] = useState(null);
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading]= useState(false)



  //-----Spotify API Access Token ------------

    const baseUrl = `https://accounts.spotify.com/api/token`
    const client_ID= 'bec8e94459364f46b241c54a02dc7727'
    const client_Secret = "16dfb099cf584eeca7bd081e0fe16138"

    useEffect(()=> {
      let authParameters = {
        method: "POST",
        headers: {
            'Content-Type': "application/x-www-form-urlencoded"
        },
        body: 'grant_type=client_credentials&client_id=' + client_ID + "&client_secret=" + client_Secret 
    }
    fetch(baseUrl, authParameters)
        .then(result=> result.json())
        .then(data => {
          localStorage.setItem('spotifyToken', data.access_token)
        })
    }, [baseUrl])
    //-------------------------
    


  useEffect(() => {
    if (auth()?.email !== undefined) {
      setIsLogged(true);

    } else {
      setIsLogged(false)

    }
  }, [auth]);



  useEffect(() => {
    async function getAllRecords() {
      try {
        setLoading(true)
        const allRecords = await data.getRecords();
        setRecords(allRecords);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    getAllRecords();
  }, [isChanged]);



  const contextValue = {
    isOwner,
    setIsOwner,
    records,
    setRecords,
    setIsChanged,
    isLogged,
    setLoading,
    loading,
    errorMessages,
    setErrorMessages
    }


  return (
    <>
    <RecordContext.Provider value={contextValue}>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/create" element={<RequireAuth loginPath="/login"> <Create/> </RequireAuth>}/>
        <Route path="/records/:recordId" element={<Details/>}/>
        <Route path="/records/:recordId/edit" element={<RequireAuth loginPath="/login"><Edit/></RequireAuth>}/>                                                    
         <Route path="/myProfile" element={<RequireAuth loginPath="/login"><Profile/></RequireAuth>} />
         <Route path="*" element={<Error/>}/>
      </Routes>
      </RecordContext.Provider>
      <Footer />
    </>
  );
}

export default App;
