import styles from "../Login/Login.module.css";
import * as data from '../../api/data';


import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {useSignIn} from 'react-auth-kit'
import { useContext } from "react";
import {RecordContext } from "../../contexts/RecordContext";
import {useAuthUser} from 'react-auth-kit'

function Login() {
  const {setErrorMessages, errorMessages, isLogged, setUserEmail} = useContext(RecordContext)
  const navigate = useNavigate();
  const singIn = useSignIn()
  const auth = useAuthUser()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if(isLogged === true){
    navigate('/')
  }


  

 async function onLoginClick(e){
  e.preventDefault()
  
  let response = await data.login(email, password)

  if(response['errors']){
    setErrorMessages(response.message)
    setTimeout(()=> {
      setErrorMessages(null)
    },3000)
  } else {
  singIn({
    token: response.accessToken,
    expiresIn: 3600,
    tokenType: "Bearer",
    authState: {email: response.email, id: response._id}
  })
  setErrorMessages(null)
  setUserEmail(auth()?.email)
  navigate('/')
}


console.log(errorMessages)

}



  return (
    <>
      <div className={styles.hero}>

      {errorMessages && (
              <div className={styles.errorMsg}>
              <h1> Error Message:</h1>
              <p>{errorMessages}</p>
            </div>
      )}

        <form action="" method="">
          <div className={styles.registerbox}>
            <label htmlFor="email">
              <i className="fa-solid fa-envelope" /> Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Write you email..."
              onChange={(e) => setEmail(e.target.value)}
              />
            <br />
          </div>
          <br />
          <div className={styles.registerbox}>
            <label htmlFor="password">
              <i className="fa-solid fa-lock" /> Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.submitButton} type="button" onClick={onLoginClick}>
            <span />
            LOGIN{" "}
          </button>
          <p className={styles.noaccount}>Don't have an account ? <a href="/register">Create one</a></p>
        </form>
      </div>
    </>
  );
}
export default Login