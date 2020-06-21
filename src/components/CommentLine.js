import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sagaCommentTypes } from "../store/sagas/comments";
import { AiOutlineEdit } from "react-icons/ai";
import { FcDeleteRow } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { FcCancel, FcCheckmark } from "react-icons/fc";
// MdDeleteForever

import "./CommentLine.scss";

export default function CommentLine({ comment }) {
  //   const dispatch = useDispatch();
  //   let comments = useSelector(state =>
  //     state.comments.filter(comment => comment.parentId === parentId)
  //   );
  const [add, setAdd] = useState(false);
  //   const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState(false);
  const edit_border = editComment ? "edit-border-comment" : "";

  return (
    <div key={comment.id} style={{ position: "relative" }}>
      <div style={{ backgroundColor: "white" }}>
        <p
          contentEditable={editComment}
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
            <FcCheckmark />
          ) : (
            <AiOutlineEdit onClick={() => setEditComment(true)} />
          )}
          {editComment && <FcCancel onClick={() => setEditComment(false)} />}
          <MdDeleteForever />
        </div>
      </div>
    </div>
  );
}
