import { useState } from "react";
import * as data from "../api/data";

export const useCommentForm = (initialValueContent, initialeValueAllComments, recordId) =>{

    const [commentContent, setCommentContent] = useState(initialValueContent);
    const [allComments, setAllComments] = useState(initialeValueAllComments);

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
      if(commentContent !== ""){
        const newComment = await data.addComment(body);
        setAllComments((state) => [newComment, ...state]);
        setCommentContent("")
      }
    };
  
      return {
        allComments,
        setAllComments,
        onChangeHandler,
        commentContent,
        onSubmitHandler
      }


}