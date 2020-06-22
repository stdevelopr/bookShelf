import { put } from "redux-saga/effects";
import { actions } from "../reducers/comments";

const base = "SAGA";
export const sagaCommentTypes = {
  FETCH_COMMENTS: `FETCH_COMMENTS_${base}`,
  ADD_COMMENT: `ADD_COMMENT_${base}`,
  EDIT_COMMENT: `EDIT_COMMENT_${base}`,
  DELETE_COMMENT: `DELETE_COMMENT_${base}`
};

export const sagaCommentWorkers = {
  fetchComments: function*() {
    let comments = getStorageActiveComments();
    yield put(actions.fetchComments(comments));
  },
  addComment: function*({ comment }) {
    let comments = getStorageActiveComments();
    comments.unshift({
      id: guid(),
      parentId: comment.parentId,
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
      deleted: comment.deleted
    });
    setStorageComments(comments);
    yield put(actions.addComment(comments));
  },
  editComment: function*({ payload: comment }) {
    let comments = getStorageActiveComments();
    let index = findCommentIndexById(comments, comment.id);
    let new_comments_array = [...comments];
    new_comments_array[index] = { ...comment };
    setStorageComments(new_comments_array);
    yield put(actions.editComment(new_comments_array));
  },
  deleteComment: function*({ payload: commentId }) {
    const comments = getStorageActiveComments();
    const index = findCommentIndexById(comments, commentId);
    if (index !== -1) {
      const new_comments_array = [...comments];
      new_comments_array[index]["deleted"] = true;
      setStorageComments(new_comments_array);
      yield put(actions.deleteComment(getStorageActiveComments()));
    }
    yield put({ type: null });
  }
};

const getStorageActiveComments = () => {
  let comments = [];
  if (localStorage.hasOwnProperty("Comments")) {
    comments = filterDeletedComments(
      JSON.parse(localStorage.getItem("Comments"))
    );
  }
  return comments;
};

const findCommentIndexById = (commentsArray, commentItemId) => {
  const index = commentsArray.findIndex(
    comment => comment.id === commentItemId
  );
  return index;
};

const setStorageComments = commentsArray => {
  localStorage.setItem("Comments", JSON.stringify(commentsArray));
};

const filterDeletedComments = commentsArray => {
  return commentsArray.filter(comment => comment.deleted === false);
};

const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + "-" + s4();
};
