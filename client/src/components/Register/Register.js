import styles from "../Register/Register.module.css";
import * as data from '../../api/data';
import { useContext } from "react";
import {RecordContext } from "../../contexts/RecordContext";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useSignIn} from 'react-auth-kit'
import { Link } from "react-router-dom";



function Register() {
  const navigate = useNavigate();
  const singIn = useSignIn();
  const { setErrorMessages, errorMessages, isLogged } =
    useContext(RecordContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [gender, setGender] = useState("female");

  if (isLogged) {
    navigate("/");
  }

  async function submit(e) {
    e.preventDefault();

    let response = await data.register(email, password, rePassword, gender);

    if (response.hasOwnProperty("errors")) {
      setErrorMessages(response.message);
      setTimeout(() => {
        setErrorMessages(null);
      }, 3000);
    } else {
      singIn({
        token: response.accessToken,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: response.email, id: response._id },
      });
      setErrorMessages(null);
      navigate("/");
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
        </div>

        <div className={styles.registerbox1}>
          <label className={styles.registerboxLabels} htmlFor="gender">
            Gender:
          </label>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="female">
              Female:
            </label>
            <input
              className={styles.radioInput}
              type="radio"
              id="female"
              name="female"
              value="female"
              onChange={(e) => setGender(e.target.name)}
              checked={gender === "female"}
            />
          </div>

          <div className={styles.radioButtons}>
            <label className={styles.radioLabels} htmlFor="male">
              Male:
            </label>
            <input
              className={styles.radioInput}
              type="radio"
              id="male"
              name="male"
              value="male"
              onChange={(e) => setGender(e.target.name)}
              checked={gender === "male"}
            />
          </div>
          <br />
        </div>
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
          <button
            className={styles.submitButton}
            type="button"
            onClick={submit}
          >
            {" "}
            <span /> REGISTER{" "}
          </button>
          <p className={styles.noaccount}>
            Have an account ? <Link to="/login">Click here</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
