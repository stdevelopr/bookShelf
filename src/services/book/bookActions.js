import axios from "axios";
import {
  SET_BOOK_VIEW,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  ADD_NEW_BOOK
} from "./bookTypes";

export const setBookView = book => {
  return {
    type: SET_BOOK_VIEW,
    payload: book
  };
};

const fetchBooksRequest = () => {
  return { type: FETCH_BOOKS_REQUEST };
};

const fetchBooksSuccess = books => {
  return {
    type: FETCH_BOOKS_SUCCESS,
    payload: books
  };
};

const fetchBooksFailure = error => {
  return {
    type: FETCH_BOOKS_FAILURE,
    payload: error
  };
};

export const fetchBooks = () => {
  return dispatch => {
    dispatch(fetchBooksRequest());

    const books = JSON.parse(localStorage.getItem("books"));
    if (books) dispatch(fetchBooksSuccess(books));
    else {
      dispatch(fetchBooksFailure("Sem livros"));
    }
    // axios
    //   .get("https://jsonplaceholder.typicode.com/albums")
    //   .then(response => {
    //     const books = response.data;
    //     dispatch(fetchBooksSuccess(books));
    //   })
    //   .catch(error => {
    //     const errorMsg = error.message;
    //     dispatch(fetchBooksFailure(errorMsg));
    //   });
  };
};

export const addNewBook = book => {
  return dispatch => {
    let books = new Array();
    if (localStorage.hasOwnProperty("books")) {
      const prev = JSON.parse(localStorage.getItem("books"));
      prev.push(book);
      localStorage.setItem("books", JSON.stringify(prev));
      dispatch({ type: ADD_NEW_BOOK, payload: prev });
    } else {
      books.push(book);
      localStorage.setItem("books", JSON.stringify(books));
      dispatch({ type: ADD_NEW_BOOK, payload: books });
    }
  };
};
