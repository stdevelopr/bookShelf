import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { sagaCommentTypes } from "../store/sagas/comments";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { useToasts } from "react-toast-notifications";

import "./CommentLine.scss";

export default function CommentLine({ comment }) {
  const dispatch = useDispatch();
  const [editComment, setEditComment] = useState(false);
  const edit_border = editComment ? "edit-border-comment" : "";
  const { addToast } = useToasts();
  const commentRef = useRef();

  useEffect(() => {
    commentRef.current.innerHTML = comment.body;
  });

  const saveComment = () => {
    const comment_copy = { ...comment };
    comment_copy.body = commentRef.current.innerHTML;
    dispatch({ type: sagaCommentTypes.EDIT_COMMENT, payload: comment_copy });
    setEditComment(false);
    addToast("Saved Successfully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: "3000"
    });
  };

  const cancelEditing = () => {
    commentRef.current.innerHTML = comment.body;
    setEditComment(false);
  };

  return (
    <div key={comment.id} style={{ position: "relative" }}>
      <div style={{ backgroundColor: "white" }}>
        <p
          ref={commentRef}
          contentEditable={editComment}
          suppressContentEditableWarning={true}
          className={`comment-item word-break ${edit_border}`}
        >
          {comment.body}
        </p>
      </div>
      <div
        style={{
          display: "inline-block",
          position: "absolute",
          top: "0px",
          right: "0px"
        }}
      >
        <div style={{ width: "50px", textAlign: "center" }}>
          {editComment ? (
            <FcCheckmark onClick={() => saveComment()} />
          ) : (
            <AiOutlineEdit onClick={() => setEditComment(true)} />
          )}
          {editComment && <FcCancel onClick={() => cancelEditing()} />}
          <MdDeleteForever
            onClick={() => {
              dispatch({
                type: sagaCommentTypes.DELETE_COMMENT,
                payload: comment.id
              });
              addToast("Deleted Successfully", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: "3000"
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
