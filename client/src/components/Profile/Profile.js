import styles from "../Profile/Profile.module.css";
import Record from "../SingleRecord/Record";
import * as data from "../../api/data";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { RecordContext } from "../../contexts/RecordContext";
import Spinner from "../../utils/Spinner";

function Profile() {
  const { loading, setLoading, isChanged, records } = useContext(RecordContext);
  const [currentUser, setCurrentUser] = useState({});
  const userId = localStorage.getItem("userId");

  const [allMyRecords, setAllMyRecords] = useState([]);
  const [wishList, setWishlist] = useState([]);
   
  const buyOrHave = true

  useEffect(() => {
    async function getMy() {
      setLoading(true);
      const response = await data.getMyRecords(`myRecords`);
      console.log(response);
      setAllMyRecords(response);
      setLoading(false);
    }
    getMy();
  }, [userId, setLoading]);

  useEffect(() => {
    async function getUserInfo() {
      setLoading(true);
      const response = await data.getUser();
      setCurrentUser(response);
      setLoading(false);
    }
    getUserInfo();
  }, [setLoading]);


  useEffect(() => {
    async function getWish() {
      setLoading(true);
      const response = await data.getMyWishList(`wishList`);
      setWishlist(response);
      setLoading(false);
    }
    getWish();
  }, [setLoading, isChanged, records]);


  console.log(currentUser);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className={styles.profilepage}>
      <div className={styles.profilecard}>
        <div className={styles.topsection}>
          <div className={styles.pic}>
            {currentUser.gender === "female" ? (
              <img
                src="https://cdn.stockmediaserver.com/smsimg30//PV/IsignstockContributors/ISS_13301_02713.jpg?token=GAvWiMeh6UzN3GrGgChDFro63w2Fp6yG2jhG0bdv7RM&class=pv&smss=52&expires=4102358400"
                alt=""
              />
            ) : (
              <img
                src="https://st.depositphotos.com/5891300/57446/v/600/depositphotos_574462682-stock-illustration-old-fashioned-disc-jockey-mixer.jpg"
                alt=""
              />
            )}
          </div>
          <div className={styles.email}>{currentUser.email}</div>
        </div>

        <div className={styles.bottomsection}>
          <h2>My Records</h2>
        </div>
      </div>
      <div className={styles.wishbooks}>
        {allMyRecords.map((x) => (
          <Record key={x._id} {...x} />
        ))}
        {/* <!--If there are wished books--> */}
        {/* <!--If there are no wished books--> */}
        {allMyRecords.length === 0 && (
          <h2 className={styles.norecords}>
            There are no records posted yet...
          </h2>
        )}
      </div>

      <div>
        <div className={styles.bottomsection2}>
          <h2>Wish List</h2>
        </div>
      </div>
      <div className={styles.wishbooks}>
        {wishList.map((x) => (
          <Record key={x._id} buyOrHave={buyOrHave} {...x} />
        ))}
        {/* <!--If there are wished books--> */}
        {/* <!--If there are no wished books--> */}
        {wishList.length === 0 && (
          <h2 className={styles.norecords}>
            There are no records in the wishing list yet...
          </h2>
        )}
      </div>
    </section>
  );
}

export default Profile;
