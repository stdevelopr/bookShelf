import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sagaCommentTypes } from "../store/sagas/comments";
import { BsPlusSquare } from "react-icons/bs";
import Button from "react-bootstrap/Button";
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
  // const edit_border = editComment ? "edit-border-comment" : "";
  return (
    <div
      style={{
        marginTop: "20px",
        padding: "10px 20px 0px 20px",
        backgroundColor: "whitesmoke"
      }}
    >
      <div
        style={{ textAlign: "center", fontSize: "20px", marginBottom: "10px" }}
      >
        Comments
      </div>
      {comments.length > 0
        ? comments.map(comment => (
            <CommentLine key={comment.id} comment={comment} />
          ))
        : ""}
      <div style={{ textAlign: "center" }}>
        {!add && (
          <BsPlusSquare
            onClick={() => setAdd(!add)}
            style={{ fontSize: "25px" }}
          />
        )}
        <div>
          {add && (
            <div>
              <textarea
                style={{ height: "100px", width: "100%" }}
                value={comment}
                onChange={e => setComment(e.target.value)}
              ></textarea>
              <Button
                variant="success"
                style={{ marginRight: "10px" }}
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
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setAdd(false);
                  setComment("");
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
