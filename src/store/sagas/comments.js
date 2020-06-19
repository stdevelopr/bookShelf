import { put } from "redux-saga/effects";
import { actions } from "../reducers/comments";

const base = "SAGA";
export const sagaCommentTypes = {
  FETCH_COMMENTS: `FETCH_COMMENTS_${base}`,
  ADD_COMMENT: `ADD_COMMENT_${base}`
};

export const sagaCommentWorkers = {
  fetchComments: function*() {
    let comments = getStorageActiveComments();
    yield put(actions.fetchComments(comments));
  },
  addComment: function*({ comment }) {
    let comments = getStorageActiveComments();
    comments.push({
      id: guid(),
      parentId: comment.parentId,
      timestamp: Date.now(),
      body: comment.body,
      author: comment.author,
      deleted: comment.deleted
    });
    setStorageComments(comments);
    yield put(actions.addComment(comments));
  }
  //   editBook: function*({ payload: book }) {
  //     let books = getStorageActiveBooks();
  //     let index = findBookIndexById(books, book.id);
  //     let new_books_array = [...books];
  //     new_books_array[index] = { ...book };
  //     setStorageBooks(new_books_array);
  //     yield put(actions.editBook(new_books_array));
  //   },
  //   deleteBook: function*({ payload: bookId }) {
  //     const books = getStorageActiveBooks();
  //     const index = findBookIndexById(books, bookId);
  //     if (index !== -1) {
  //       const new_books_array = [...books];
  //       new_books_array[index]["deleted"] = true;
  //       setStorageBooks(new_books_array);
  //       yield put(actions.deleteBook(getStorageActiveBooks()));
  //     }
  //     yield put({ type: null });
  //   }
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
