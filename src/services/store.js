import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import bookReducer from "./book/bookReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  bookReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
