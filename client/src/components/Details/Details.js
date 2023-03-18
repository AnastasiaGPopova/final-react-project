import { useParams } from "react-router-dom";
import styles from "../Details/Details.module.css";
import { useEffect, useState } from "react";
import * as data from "../../api/data";
import { useNavigate } from "react-router-dom";
import SingleComment from "./SingleComment/SingleComment";
import { isUserLogedIn, isOwnerRecord } from "../../util/useLocalStorage";

function Details({ onDeleteClick }) {
  const { recordId } = useParams();
  const navigate = useNavigate();

  const [currentRecord, setCurrentRecord] = useState({});
  const [commentContent, setCommentContent] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [stateIsChanged, setStateIsChanged] = useState(null);
  const [isAlreadyWished, setIsAlreadyWished] = useState(false)

  let isLogged = false;
  let isOwner = false;

  const currentUserId = localStorage.getItem("userId");

  if (localStorage.getItem("email")) {
    isLogged = true;
  }

  //-------Get All Comments for this Record-----------
  useEffect(() => {
    async function getAllComments() {
      const response = await data.getAllCommentsForRecord(recordId);
      setAllComments(response);
    }
    getAllComments();
  }, [stateIsChanged]);

  //--------Get current Record------------
  useEffect(() => {
    async function getCurrent() {
      const response = await data.getItemById(recordId);
      setCurrentRecord(response);
    }

    getCurrent();
  }, [recordId, stateIsChanged]);

  if (currentRecord._ownerId === localStorage.getItem("userId")) {
    isOwner = true;
  }

  console.log(currentRecord.wishingList)

  // useEffect(() => {

  //   if(currentRecord.hasOwnProperty('wishingList')){
  //     if(currentRecord.wishingList.length !== 0){
  //       if(currentRecord.wishingList === 1){
  //         setIsAlreadyWished(true)
  //       } else if (currentRecord.wishingList.includes(currentUserId)){
  //         setIsAlreadyWished(true)
  //       }
  //     }
  //   }
  // }, [currentRecord.wishingList])

console.log(currentRecord.wishingList)


  async function onWishClick() {
    let newList = currentRecord.wishingList.push(currentUserId);
    setCurrentRecord((state) => ({ ...state, ["wishingList"]: newList }));
    let newBody = { ...currentRecord };
    const updatedWish = await data.editRecord(recordId, newBody);
    navigate(`/records/${recordId}`);
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

          {isLogged=== true && 
          <div className={styles.buttons}>
            {/* Only for registered user and author of the review */}
            {isOwner ? (
              <>
                <a
                  href={`/records/${currentRecord._id}/edit`}
                  className={styles.btnedit}
                >
                  Edit
                </a>
                <a
                  href={`/catalog`}
                  className={styles.btndelete}
                  onClick={() => onDeleteClick(recordId)}
                >
                  Delete
                </a>
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
                <a
                  href={`/records/${currentRecord._id}`}
                  className={styles.btnwish}
                  onClick={onWishClick}
                >
                <i className="fa-regular fa-heart" /> Love it! Wish to hear!
                </a>
                </>
               )
               }
              </>
            )}
          </div>
           }
        </article>
        <article className={styles.detailscardimage}>
          <img src={currentRecord.imageUrl} />
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
