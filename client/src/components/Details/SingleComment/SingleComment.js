import styles from "../SingleComment/SingleComment.module.css";

function SingleComment({ ownerComment, content, recordId }) {
  return (
    <>
      <div className={styles.singleComment}>
        <h3>{ownerComment}</h3>
        <p>{content}</p>
      </div>
      <br />
    </>
  );
}

export default SingleComment;
