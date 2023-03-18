import styles from "../Register/Register.module.css";
import * as data from '../../api/data';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSignIn} from 'react-auth-kit'



function Register() {
  
  const navigate = useNavigate();
  const singIn = useSignIn()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessages, setErrorMessages] = useState(null)


  async function submit(e) {
    e.preventDefault()
  
      let response = await data.register(email, password, rePassword)

      if(response.hasOwnProperty('errors')){
        setErrorMessages(response.message)
      } else {
      singIn({
        token: response.accessToken,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {email: response.email, id: response._id}
      })
      setErrorMessages(null)
      navigate('/')
    }
}


  return (
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
            value={email}
            placeholder="Write you email..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br/>
        </div>

          {/* -----------NEW---------- */}
        {/* <div className={styles.registerbox}>
          <label htmlFor="email">
            <i className="fa-solid fa-envelope" /> Gender:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            placeholder="female /male/ other..."
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
        </div> */}


        <br />
        <div className={styles.registerbox}>
          <label htmlFor="password">
            <i className="fa-solid fa-lock" /> Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="Enter password..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </div>
        <br />
        <div className={styles.registerbox}>
          <label htmlFor="rePassword">
            <i className="fa-solid fa-repeat" /> Repeat password:{" "}
          </label>
          <input
            type="password"
            id="rePassword"
            name="rePassword"
            value={rePassword}
            placeholder="Repeate password..."
            onChange={(e) => setRePassword(e.target.value)}
          />
          <br />
        </div>

        <button className={styles.submitButton} type="button" 
        onClick={submit}>{" "}<span /> REGISTER{" "}
        </button>        
        <p className={styles.noaccount}>Have an account ? <a href="/login">Click here</a></p>
      </form>
      
    </div>
  );
}

export default Register;
