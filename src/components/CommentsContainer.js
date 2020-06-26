import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sagaCommentTypes } from "../store/sagas/comments";
import { BsPlusSquare } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import CommentLine from "./CommentLine";
import { useToasts } from "react-toast-notifications";

export default function CommentsContainer({ parentId }) {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  let comments = useSelector(state =>
    state.comments.filter(comment => comment.parentId === parentId)
  );
  const [add, setAdd] = useState(false);
  const [comment, setComment] = useState("");

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
                  setComment("");
                  addToast("Added Successfully", {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: "3000"
                  });
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
