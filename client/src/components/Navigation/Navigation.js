import styles from '../Navigation/Navigation.module.css';
import * as data from '../../api/data';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";





function Navigation({isLogged, setUserEmail}){

    const navigate = useNavigate()

    async function onLockOutClick() {
        data.logout()
        setUserEmail('')
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
                 {/* <li> <Link to={onLockOutClick}>Logout</Link></li> */}
                 <li> <a href="/" onClick={onLockOutClick}>LOGOUT</a></li>
                 </>)
                 :
                 (<><li> <Link to="/login">Login</Link></li>
                    <li> <Link to="/register">Register</Link></li></>)
                } 
                

                {/* <li> <a href="/">Home</a></li>
                <li> <a href="/login">Login</a></li>
                <li> <a href="/register">Register</a></li>
                <li> <a href="/catalog">Catalog</a></li>

                <li> <a href="/create">CREATE</a></li>
                <li> <a href="/myprofile">My Profile</a></li>
                <li> <a href="/" onClick={onLockOutClick}>LOGOUT</a></li> */}

            </ul>
        </nav>
    </div>
    )
}

export default Navigation