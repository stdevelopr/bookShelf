import axios from "axios";
import {
  SET_BOOK_VIEW,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
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
    axios
      .get("https://jsonplaceholder.typicode.com/albums")
      .then(response => {
        const books = response.data;
        dispatch(fetchBooksSuccess(books));
      })
      .catch(error => {
        const errorMsg = error.message;
        dispatch(fetchBooksFailure(errorMsg));
      });
  };
};
