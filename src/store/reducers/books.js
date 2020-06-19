const base = "REDUX";
export const types = {
  FETCH_STORAGE_BOOKS: `FETCH_STORAGE_BOOKS_${base}`,
  ADD_NEW_BOOK: `ADD_NEW_BOOK_${base}`,
  EDIT_BOOK: `EDIT_BOOK_${base}`,
  DELETE_BOOK: `DELETE_BOOK_${base}`,
  SET_BOOK_VIEW: `SET_BOOK_VIEW_${base}`
};

export const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_STORAGE_BOOKS:
      return action.payload;

    case types.ADD_NEW_BOOK:
      return action.payload;

    case types.EDIT_BOOK:
      return action.payload;

    case types.DELETE_BOOK:
      return action.payload;

    default:
      return state;
  }
};

export const actions = {
  fetchBooks: books => ({ type: types.FETCH_STORAGE_BOOKS, payload: books }),
  editBook: books => ({ type: types.EDIT_BOOK, payload: books }),
  addNewBook: books => ({ type: types.ADD_NEW_BOOK, payload: books }),
  deleteBook: books => ({ type: types.DELETE_BOOK, payload: books })
};
