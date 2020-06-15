import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import bookReducer from "./book/bookReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  bookReducer,
  composeWithDevTools(applyMiddleware(logger))
);

export default store;
