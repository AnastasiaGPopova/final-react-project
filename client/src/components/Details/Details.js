import { useParams } from "react-router-dom";
import styles from "../Details/Details.module.css";
import { useEffect, useState } from "react";
import * as data from "../../api/data";
import { useNavigate } from "react-router-dom";
import SingleComment from "./SingleComment/SingleComment";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {RecordContext } from "../../contexts/RecordContext";

function Details() {
  const {setIsOwner, setRecords, setIsChanged, isOwner, isLogged} = useContext(RecordContext)
  const { recordId } = useParams();
  const navigate = useNavigate();

  const [currentRecord, setCurrentRecord] = useState({});
  const [commentContent, setCommentContent] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [stateIsChanged, setStateIsChanged] = useState(null);
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
  }, [stateIsChanged, recordId]);

  //--------Get current Record------------
  useEffect(() => {
    async function getCurrent() {
      const response = await data.getItemById(recordId);
      if(response._ownerId._id === currentUserId){
        setIsOwner(true)
      }else{
        setIsOwner(false)
      }
      setPostedBy(response._ownerId.email)
      setCurrentRecord(response);
    }

    getCurrent();
  }, [recordId, setIsOwner, currentUserId]);


  //--------Setting isWished or not------------
  useEffect(() => {
    if(currentRecord.hasOwnProperty('wishingList')){
      if(currentRecord.wishingList.includes(currentUserId)){
        setIsAlreadyWished(true)
      }
    }
  }, [currentRecord, currentUserId, stateIsChanged])


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

  console.log(currentRecord)

//--------on Delete Click------------
  async function onDeleteClick(id){
    const choise = window.confirm("Are you sure you want to delete this item?")
    if(choise){
      await data.deleteRecord(id)
      setRecords(state => (state.filter(x => x._id !== id)))
    }
  }

  const onChangeHandler = (e) => {
    setCommentContent(e.target.value);
    console.log(commentContent);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const body = {
      ownerComment: localStorage.getItem("email"),
      content: commentContent,
      recordId: recordId,
    };
    const newComment = await data.addComment(body);
    setAllComments((state) => [...state, newComment]);
    setStateIsChanged(newComment);
    e.target.reset();
  };

  return (
    <section className={styles.detailspage}>
      <h1>Details</h1>
      <article className={styles.detailscard}>
        <article className={styles.detailscardtext}>
          <h2>
            Record Name:
            <br /> {currentRecord.recordName}
          </h2>
          <h3>Artist: {currentRecord.artist}</h3>
          <h3>Genre: {currentRecord.genre}</h3>
          <h3>Description: {currentRecord.description}</h3>
          {/* If there is no registered user, do not display buttons*/}
          <h3>Likes: {currentRecord.likes}</h3>
          <h3>Posted by: {postedBy}</h3>
          
    

          {isLogged=== true && 
          <div className={styles.buttons}>
            {/* Only for registered user and author of the review */}
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
  );
}

export default Details;
