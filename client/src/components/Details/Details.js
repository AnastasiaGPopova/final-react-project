import { useParams } from "react-router-dom";
import styles from "../Details/Details.module.css";
import { useEffect, useState } from "react";
import * as data from "../../api/data";
import { useNavigate } from "react-router-dom";
import SingleComment from "./SingleComment/SingleComment";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {RecordContext } from "../../contexts/RecordContext";
import Spinner from "../../utils/Spinner";
import { useCommentForm } from "../../hooks/useCommentForm";

function Details() {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const {setIsOwner, setRecords, setIsChanged, isOwner, isLogged, loading, setLoading} = useContext(RecordContext)
  const {allComments, commentContent, setAllComments, onChangeHandler, onSubmitHandler} = useCommentForm(
    "", [], recordId)

  const [currentRecord, setCurrentRecord] = useState({});
  const [isAlreadyWished, setIsAlreadyWished] = useState(false)
  const [postedBy, setPostedBy] = useState('')


  const currentUserId = localStorage.getItem("userId");
  console.log(currentUserId)

  //-------Get All Comments for this Record-----------
  useEffect(() => {
    async function getAllComments() {
      const response = await data.getAllCommentsForRecord(recordId);
      setAllComments(response);
    }
    getAllComments();
  }, [recordId, setAllComments]);

  //--------Get current Record------------
  useEffect(() => {
    async function getCurrent() {
      setLoading(true)
      const response = await data.getItemById(recordId);
      if(response._ownerId._id === currentUserId){
        setIsOwner(true)
      }else{
        setIsOwner(false)
      }
      setPostedBy(response._ownerId.email)
      setCurrentRecord(response);
      setLoading(false)
    }

    getCurrent();
  }, [recordId, setIsOwner, currentUserId, setLoading]);
 //---------------------------------------

 
  //--------Set isWished or not------------
  useEffect(() => {
    if(currentRecord.hasOwnProperty('wishingList')){
      if(currentRecord.wishingList.includes(currentUserId)){
        setIsAlreadyWished(true)
      }
    }
  }, [currentRecord, currentUserId])
 //---------------------------------------

  console.log(isOwner)

  //--------on Wish/Like Click------------
  async function onWishClick() {
    currentRecord.wishingList.push(currentUserId);
    currentRecord.likes++
    setCurrentRecord((state) => ({ ...state, wishingList: currentRecord.wishingList, likes: currentRecord.likes }));
    let newBody = { ...currentRecord };
    const updatedWish = await data.editRecord(recordId, newBody);
    setRecords(state => [...state, updatedWish])
    setIsChanged(updatedWish)
    navigate(`/records/${recordId}`);
  }
   //---------------------------------------

  console.log(currentRecord)

//--------on Delete Click------------
  async function onDeleteClick(id){
    const choise = window.confirm("Are you sure you want to delete this item?")
    if(choise){
      await data.deleteRecord(id)
      setRecords(state => (state.filter(x => x._id !== id)))
      await data.deleteAllCommentsbyUser(recordId)
    }
  }
  //---------------------------------------


  return (
    loading ? (<Spinner loading={loading}/>) :
    (
    <section className={styles.detailspage}>
      <h1>Record details</h1>
      <article className={styles.detailscard}>
        <article className={styles.detailscardtext}>
          <h2>
            Record Name:
            <br /> {currentRecord.recordName}
          </h2>
          <h3>Artist: {currentRecord.artist}</h3>
          <h3>Genre: {currentRecord.genre}</h3>
          <h3>RPM: {currentRecord.rpm}</h3>
          <h3>Description: {currentRecord.description}</h3>
          {/* If there is no registered user, do not display buttons*/}
          <h3>Likes: {currentRecord.likes}</h3>
          <h3>Posted by: {postedBy}</h3>
          
    

          {isLogged=== true && 
          <div className={styles.buttons}>
            {/* Only for registered user and owner of the record */}
            {isOwner ? (
              <>
                <Link to={`/records/${currentRecord._id}/edit`}
                  className={styles.btnedit}
                >
                  Edit
                </Link>
                <Link to={`/catalog`}
                  className={styles.btndelete}
                  onClick={() => onDeleteClick(recordId)}
                >
                  Delete
                </Link>
              </>
            ) : (
              <>
              {isAlreadyWished ? 
              (
                <p className={styles.btnwish}>
                You already liked this record and added it to your wish list
                </p>
              )
               :
               (
                <>
                <Link to={`/records/${currentRecord._id}`}
                  className={styles.btnwish}
                  onClick={onWishClick}
                >
                <i className="fa-regular fa-heart" /> Love it! Wish to hear!
                </Link>
                </>
               )
               }
              </>
            )}
          </div>
           }
        </article>
        <article className={styles.detailscardimage}>
          <img src={currentRecord.imageUrl} alt=""/>
        </article>
      </article>
      <br />
      <br />
      {isLogged=== true && 
      <article className={styles.test}>
        <article className={styles.comments}>
          <article className={styles.addacomment}>
            <form action="/comments" method="POST" onSubmit={onSubmitHandler}>
              <label>Add your comment here:</label>
              <textarea value={commentContent} onChange={onChangeHandler} />
              <button className={styles.homebuttons}>
                <span className={styles.home} />
                ADD COMMENT
              </button>
            </form>
            <article className={styles.allcomments}>
              {allComments.map((x) => (
                <SingleComment key={x._id} {...x} />
              ))}
            </article>
          </article>
        </article>
      </article>}
    </section>
  )
  )
}

export default Details;
