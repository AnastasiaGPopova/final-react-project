import styles from "../Profile/Profile.module.css";
import Record from '../SingleRecord/Record';




function Profile() {


    return(

        <section className={styles.profilepage}>
        <div className={styles.profilecard}>
            <div className={styles.topsection}>
                <div className={styles.pic}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvPnjeYyAvdnoC_gdZYcJJK_f9f8jZoieK1-JG4YLc3SES_JeHlBbhDEtlyiA2atnl2W0&usqp=CAU"/>
                </div>
                <div className="email">jennifer23@gmail.com</div>
            </div>

            <div className={styles.bottomsection}>
                <h2>My Records</h2>
            </div>
        </div>
        <div className={styles.wishbooks}>
            {/* <!--If there are wished books--> */}
            {/* <!--If there are no wished books--> */}
            <h2 className={styles.norecords}>There are no records posted yet...</h2>
        </div>
    </section>

    )
}

export default Profile