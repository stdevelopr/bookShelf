import React from "react";
import { useDispatch } from "react-redux";
import { fetchStorageBooks } from "./services";
import BookCategory from "./pages/BookCategory";
import BookView from "./pages/BookView";
import BookControl from "./pages/BookControl";
import Home from "./pages/Home";
import { Switch, Route } from "react-router-dom";
import "./App.scss";

function App() {
  const dispatch = useDispatch();
  dispatch(fetchStorageBooks());
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/category">
        <BookCategory />
      </Route>
      <Route path="/book">
        <BookView />
      </Route>
      <Route path="/control">
        <BookControl />
      </Route>
    </Switch>
  );
}

export default App;
