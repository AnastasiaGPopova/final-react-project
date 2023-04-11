import styles from "../SingleRecord/Record.module.css";
import { Link } from "react-router-dom";
import {RecordContext } from "../../contexts/RecordContext";
import { useContext } from "react";
import * as data from "../../api/data";
import { useNavigate } from "react-router-dom";

function Record({
  recordName,
  artist,
  description,
  year,
  rpm,
  genre,
  imageUrl,
  _id,
  likes,
  _ownerId,
  createdAt,
  buyOrHave,
  wishingList
}) {

const {setRecords, setIsChanged} = useContext(RecordContext)
const navigate = useNavigate();

  let newDate = new Date(createdAt).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });


  const currenUserID = localStorage.getItem('userId')

  async function onGotIt(){
    console.log(wishingList)
    let index = wishingList.indexOf(currenUserID)
    console.log(index)
    wishingList.splice(index, 1)
    const editedRec = {
        recordName,
        artist,
        description,
        year,
        rpm,
        genre,
        imageUrl,
        _id,
        likes,
        wishingList
    }
    const updated = await data.editRecord(_id, editedRec);
    setRecords(state => [...state, updated])
    setIsChanged(updated)
    navigate('/myProfile')

  }

  return buyOrHave ? (
    <div className={styles.record}>
      <h5>{artist}</h5>
      <p>Album: {recordName}</p>
      <img src={imageUrl} alt="" />
      <p>Likes: {likes}</p>
      <div>
        <Link to={`/records/edit`} className={styles.btnedit}>
          Buy
        </Link>
        <Link to="" onClick={onGotIt} className={styles.btndelete}>
          Got it!
        </Link>
      </div>
      <div className={styles.center}>
        <Link to={`/records/${_id}`} className={styles.textNew}>
          <span />
          Details
        </Link>
      </div>
    </div>
  ) : (
    <div className={styles.record}>
      <h5>{artist}</h5>
      <p>Album: {recordName}</p>
      <img src={imageUrl} alt="" />
      <p>Likes: {likes}</p>
      <p>Created on: {newDate}</p>
      <div className={styles.center}>
        <Link to={`/records/${_id}`} className={styles.text}>
          <span />
          Details
        </Link>
      </div>
    </div>
  );
}
export default Record;
