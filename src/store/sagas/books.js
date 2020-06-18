import { put } from "redux-saga/effects";
import { actions } from "../reducers/books";

const base = "SAGA";
export const sagaTypes = {
  FETCH_STORAGE_BOOKS: `FETCH_STORAGE_BOOKS_${base}`,
  ADD_NEW_BOOK: `ADD_NEW_BOOK_${base}`,
  EDIT_BOOK: `EDIT_BOOK_${base}`,
  DELETE_BOOK: `DELETE_BOOK_${base}`,
  SET_BOOK_VIEW: `SET_BOOK_VIEW_${base}`
};

export const sagaWorkers = {
  fechBooks: function*() {
    let books = getStorageActiveBooks();
    yield put(actions.fetchBooks(books));
  },
  addBook: function*({ payload: book }) {
    let books = getStorageActiveBooks();
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
    yield put(actions.addNewBook(books));
  },
  editBook: function*({ payload: book }) {
    let books = getStorageActiveBooks();
    let index = findBookIndexById(books, book.id);
    let new_books_array = [...books];
    new_books_array[index] = { ...book };
    setStorageBooks(new_books_array);
    yield put(actions.editBook(new_books_array));
  },
  deleteBook: function*({ payload: bookId }) {
    const books = getStorageActiveBooks();
    const index = findBookIndexById(books, bookId);
    if (index !== -1) {
      const new_books_array = [...books];
      new_books_array[index]["deleted"] = true;
      setStorageBooks(new_books_array);
      yield put(actions.deleteBook(getStorageActiveBooks()));
    }
    yield put({ type: null });
  }
};

const filterDeletedBooks = booksArray => {
  return booksArray.filter(book => book.deleted === false);
};

const getStorageActiveBooks = () => {
  let books = [];
  if (localStorage.hasOwnProperty("books")) {
    books = filterDeletedBooks(JSON.parse(localStorage.getItem("books")));
  }
  return books;
};

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
