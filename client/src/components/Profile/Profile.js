import styles from "../Profile/Profile.module.css";
import Record from '../SingleRecord/Record';
import * as data from '../../api/data';
import { useEffect, useState } from "react";


function Profile() {

    const userEmail = localStorage.getItem('email')
    const userId = localStorage.getItem('userId')

    const [allMyRecords, setAllMyRecords] = useState([])

    useEffect(() => {

        async function getMy(){

            const response = await data.getMyRecords(userId)
            console.log(response)
            setAllMyRecords(response)
        }
        getMy()
    }, [])



    return(

        <section className={styles.profilepage}>
        <div className={styles.profilecard}>
            <div className={styles.topsection}>
                <div className={styles.pic}>
                    <img
                        src="https://www.shutterstock.com/image-vector/hand-drawn-comic-gramophone-music-260nw-2258226855.jpg"/>
                </div>
                <div className="email">{userEmail}</div>
            </div>

            <div className={styles.bottomsection}>
                <h2>My Records</h2>
            </div>
        </div>
        <div className={styles.wishbooks}>

        {allMyRecords.map(x => <Record key={x._id} {...x}/>)}
            {/* <!--If there are wished books--> */}
            {/* <!--If there are no wished books--> */}
            {allMyRecords.length === 0 &&
            <h2 className={styles.norecords}>There are no records posted yet...</h2>
            }
        </div>
    </section>

    )
}

export default Profile