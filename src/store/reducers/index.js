import { combineReducers } from "redux";
import books from "./books";
import comments from "./comments";
import categories from "./categories";

export default combineReducers({
  books,
  comments,
  categories
});
