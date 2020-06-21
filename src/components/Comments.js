import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sagaCommentTypes } from "../store/sagas/comments";
import "./Comments.scss";

export default function Comments({ parentId }) {
  const dispatch = useDispatch();
  let comments = useSelector(state =>
    state.comments.filter(comment => comment.parentId === parentId)
  );
  const [add, setAdd] = useState(false);
  const [comment, setComment] = useState("");

  return (
    <div className="comments-container">
      {comments.length > 0 ? (
        comments.map(comment => (
          <p key={comment.id} className="comment-item word-break">
            {comment.body}
          </p>
        ))
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
