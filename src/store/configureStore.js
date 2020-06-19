import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

export default function configureStore(preloadedState) {
  setLocalStorage();
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  sagaMiddleware.run(rootSaga);
  return store;
}

// set initial local storage
const setLocalStorage = () => {
  const categories = {
    reading: "Currently Reading",
    wantToRead: "Want to Read",
    read: "Read"
  };
  if (!localStorage.hasOwnProperty("Comments")) {
    localStorage.setItem("Comments", JSON.stringify([]));
  }
  localStorage.setItem("Categories", JSON.stringify(categories));
};
