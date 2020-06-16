import {
  SET_BOOK_VIEW,
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  ADD_NEW_BOOK
} from "./bookTypes";

const initialState = {
  bookView: "",
  loading: false,
  books: [],
  error: ""
};
const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK_VIEW:
      return {
        ...state,
        bookView: action.payload
      };
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_BOOKS_SUCCESS:
      return {
        loading: false,
        books: action.payload,
        error: ""
      };
    case FETCH_BOOKS_FAILURE:
      return {
        loading: false,
        books: [],
        error: action.payload
      };
    case ADD_NEW_BOOK:
      console.log("JJJJ", action.payload);
      return {
        ...state,
        books: action.payload
      };
    default:
      return state;
  }
};

export default bookReducer;
