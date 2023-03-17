import "./App.css";
import { Route, Routes } from "react-router-dom";
import * as data from "./api/data";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initialEmail } from "./util/useLocalStorage";
import { useAuthUser } from "react-auth-kit";
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

function App() {
  const initialEmail2 = initialEmail();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(initialEmail2);
  const [isLogged, setIsLogged] = useState(false);
  const [records, setRecords] = useState([]);
  const [errorMessages, setErrorMessages] = useState(null);
  const [isChanged, setIsChanged] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setIsLogged(true);
    }
  }, [userEmail]);

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
      setIsChanged(response)
      navigate(`/records/${id}`)
    }
  };

  async function onDeleteClick(id){
    const choise = window.confirm("Are you sure you want to delete this item?")

    if(choise){
      const response = await data.deleteRecord(id)
      const newState = records.filter(x => x._id !== id)
      setRecords(newState)
      setIsChanged(response)
    }
  }




  return (
    <>
      <Navigation setUserEmail={setUserEmail} isLogged={isLogged} />
      <Routes>
        <Route path="/" element={<Homepage records={records} />} />
        <Route path="/login" element={<Login setUserEmail={setUserEmail} />} />
        <Route
          path="/register"
          element={<Register setUserEmail={setUserEmail} />}
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
        <Route path="/records/:recordId" element={<Details onDeleteClick={onDeleteClick}/>} />
        <Route path="/records/:recordId/edit" element={<Edit onRecordEdit={onRecordEdit} 
                                                             errorMessages={errorMessages}/>} />
         <Route path="/myProfile" element={<Profile/>} />


        
      </Routes>
      <Footer />
    </>
  );
}

export default App;
