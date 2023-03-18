import "./App.css";
import { Route, Routes } from "react-router-dom";
import * as data from "./api/data";
import { useEffect, useState } from "react";
import {useAuthUser} from 'react-auth-kit'
import { useNavigate } from "react-router-dom";
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



function App() {
  const auth = useAuthUser()
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [records, setRecords] = useState([]);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isChanged, setIsChanged] = useState(null);

  console.log(auth()?.email)

  useEffect(() => {
    const userEmail = auth()?.email
    if (userEmail !== undefined) {
      setIsLogged(true);
    } else {
      setIsLogged(false)
    }
  }, [auth()?.email, auth()]);

  console.log(isLogged)

  useEffect(() => {
    async function getAllRecords() {
      try {
        const allRecords = await data.getRecords();

        setRecords(allRecords);
      } catch (error) {
        console.log(error);
      }
    }
    getAllRecords();
  }, [isChanged]);

  const onRecordCreate = async (body) => {
    const response = await data.createRecord(body);

    if (response.hasOwnProperty("errors")) {
      setErrorMessages(response.message.join(", "));
    } else {
      setRecords(state => [...state, response]);
      setIsChanged(response)
      navigate("/catalog");
    }
  };

  const onRecordEdit = async (id, body) => {
    const response = await data.editRecord(id, body);

    if (response.hasOwnProperty("errors")) {
      setErrorMessages(response.message.join(', '));
    } else {
      setRecords(state => [...state, response]);
      setErrorMessages(null)
      setIsChanged(response)
      navigate(`/records/${id}`)
    }
  };

  async function onDeleteClick(id){
    const choise = window.confirm("Are you sure you want to delete this item?")

    if(choise){
      const response = await data.deleteRecord(id)
      setRecords(state => (state.filter(x => x._id !== id)))
      setIsChanged(response)
    }
  }
  console.log(records)


  return (
    <>
      <Navigation isLogged={isLogged} />
      <Routes>
        <Route path="/" element={<Homepage records={records} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register/>}
        />
        <Route path="/catalog" element={<Catalog records={records} />} />
        <Route
          path="/create"
          element={
            <Create
              onRecordCreate={onRecordCreate}
              errorMessages={errorMessages}
            />
          }
        />
        <Route path="/records/:recordId" element={<Details onDeleteClick={onDeleteClick}
                                                            isLogged={isLogged}/>}/>
        <Route path="/records/:recordId/edit" element={<Edit onRecordEdit={onRecordEdit} 
                                                             errorMessages={errorMessages}/>} />
         <Route path="/myProfile" element={<Profile/>} />
         <Route path="*" element={<Error/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
