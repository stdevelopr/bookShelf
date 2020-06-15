import { SET_BOOK_VIEW } from "./bookTypes";

const initialState = {
  bookView: ""
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOK_VIEW:
      return {
        ...state,
        bookView: action.payload
      };
    default:
      return state;
  }
};

export default bookReducer;
