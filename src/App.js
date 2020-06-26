import React from "react";
import { useDispatch } from "react-redux";
import { sagaCategoryTypes } from "./store/sagas/categories";
import { sagaBookTypes } from "./store/sagas/books";
import BookCategory from "./pages/BookCategory";
import BookView from "./pages/BookView";
import BookControl from "./pages/BookControl";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  dispatch({ type: sagaCategoryTypes.FETCH_CATEGORIES });
  dispatch({ type: sagaBookTypes.FETCH_STORAGE_BOOKS });
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/category/:category">
        <BookCategory />
      </Route>
      <Route path="/book/:id">
        <BookView />
      </Route>
      <Route path="/control">
        <BookControl />
      </Route>
      <Route path="/not-found">
        <NotFound />
      </Route>
      <Redirect to="not-found" />
    </Switch>
  );
}

export default App;
