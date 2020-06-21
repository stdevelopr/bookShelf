import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sagaCommentTypes } from "../store/sagas/comments";
import { AiOutlineEdit } from "react-icons/ai";
import { FcDeleteRow } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import CommentLine from "./CommentLine";
// MdDeleteForever

import "./CommentsContainer.scss";

export default function CommentsContainer({ parentId }) {
  const dispatch = useDispatch();
  let comments = useSelector(state =>
    state.comments.filter(comment => comment.parentId === parentId)
  );
  const [add, setAdd] = useState(false);
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState(false);
  const edit_border = editComment ? "edit-border-comment" : "";

  return (
    <div className="comments-container">
      {comments.length > 0 ? (
        comments.map(comment => <CommentLine comment={comment} />)
      ) : (
        <p>No comments yet...</p>
      )}
      <div>
        {!add && <button onClick={() => setAdd(!add)}>add</button>}
        <div>
          {add && (
            <div>
              <textarea
                className="comment-text-area"
                value={comment}
                onChange={e => setComment(e.target.value)}
              ></textarea>
              <button
                onClick={() => {
                  dispatch({
                    type: sagaCommentTypes.ADD_COMMENT,
                    comment: {
                      parentId: parentId,
                      timestamp: Date.now(),
                      body: comment,
                      author: "user",
                      deleted: false
                    }
                  });
                  setAdd(false);
                }}
              >
                save
              </button>
              <button
                onClick={() => {
                  setAdd(false);
                  setComment("");
                }}
              >
                cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
