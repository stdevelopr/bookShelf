// import axios from "axios";
import {
  SET_BOOK_VIEW,
  // FETCH_BOOKS_REQUEST,
  // FETCH_BOOKS_SUCCESS,
  // FETCH_BOOKS_FAILURE,
  FETCH_STORAGE_BOOKS,
  ADD_NEW_BOOK,
  EDIT_BOOK,
  DELETE_BOOK
} from "./bookTypes";

// Async calls
// const fetchBooksRequest = () => {
//   return { type: FETCH_BOOKS_REQUEST };
// };

// const fetchBooksSuccess = books => {
//   return {
//     type: FETCH_BOOKS_SUCCESS,
//     payload: books
//   };
// };

// const fetchBooksFailure = error => {
//   return {
//     type: FETCH_BOOKS_FAILURE,
//     payload: error
//   };
// };

const filterDeletedBooks = booksArray => {
  return booksArray.filter(book => book.deleted === false);
};

const getStorageActiveBooks = () => {
  return filterDeletedBooks(JSON.parse(localStorage.getItem("books")));
};

// const getBookById = bookId => {
//   let books = getStorageActiveBooks();
//   return books.filter(book => book.id === bookId)[0];
// };

const setStorageBooks = booksArray => {
  localStorage.setItem("books", JSON.stringify(booksArray));
};

const findBookIndexById = (booksArray, bookItemId) => {
  const index = booksArray.findIndex(book => book.id === bookItemId);
  return index;
};

const guid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  return s4() + "-" + s4();
};

export const fetchStorageBooks = () => {
  return dispatch => {
    let books = [];
    if (localStorage.hasOwnProperty("books")) {
      books = getStorageActiveBooks();
    }
    dispatch({
      type: FETCH_STORAGE_BOOKS,
      payload: books
    });
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

export const setBookView = book => {
  return {
    type: SET_BOOK_VIEW,
    payload: book
  };
};

export const addNewBook = book => {
  return dispatch => {
    let books = [];
    if (localStorage.hasOwnProperty("books")) {
      books = getStorageActiveBooks();
    }
    books.push({
      id: guid(),
      timestamp: Date.now(),
      title: book.title,
      description: book.description,
      author: book.author,
      category: book.category,
      deleted: book.deleted
    });
    setStorageBooks(books);
    dispatch({ type: ADD_NEW_BOOK, payload: books });
  };
};

export const editBook = book => {
  let books = getStorageActiveBooks();
  let index = findBookIndexById(books, book.id);
  let new_books_array = [...books];
  new_books_array[index] = { ...book };
  setStorageBooks(new_books_array);
  return dispatch => {
    dispatch({
      type: EDIT_BOOK,
      payload: new_books_array
    });
  };
};

export const deleteBook = bookId => {
  const books = getStorageActiveBooks();
  const index = findBookIndexById(books, bookId);
  if (index !== -1) {
    const new_books_array = [...books];
    new_books_array[index]["deleted"] = true;
    setStorageBooks(new_books_array);
    return dispatch => {
      dispatch({
        type: DELETE_BOOK,
        payload: getStorageActiveBooks()
      });
    };
  }
  return {
    type: null
  };
};
