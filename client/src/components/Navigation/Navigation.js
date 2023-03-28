import styles from '../Navigation/Navigation.module.css';
import * as data from '../../api/data';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {useSignOut} from 'react-auth-kit'
import { useContext } from "react";
import {RecordContext } from "../../contexts/RecordContext";


function Navigation(){
    const {isLogged} = useContext(RecordContext)

    const navigate = useNavigate()
    const singOut = useSignOut()

    async function onLogOutClick() {
        data.logout()
        singOut()
        navigate("/")
    }

    return(
    <div className={styles.headerNEW}>
        <nav className={styles.navbar}>
            <img src="https://i.imgupx.com/NrZyLoyH/Logo.png" alt="" className={styles.logo}/>
            <ul>
            <li> <Link to="/">Home</Link></li>
            <li> <Link to="/catalog">Catalog</Link></li>

                { isLogged ?
                 (<>
                 <li> <Link to="/create">CREATE</Link></li>
                 <li> <Link to="/myProfile">MY PROFILE</Link></li>
                 <li> <Link to="" onClick={onLogOutClick}>LOGOUT</Link></li>
                 </>)
                 :
                 (<><li> <Link to="/login">Login</Link></li>
                    <li> <Link to="/register">Register</Link></li></>)
                } 

            </ul>
        </nav>
    </div>
    )
}

export default Navigation