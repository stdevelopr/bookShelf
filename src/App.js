import React from "react";
import { Provider } from "react-redux";
import store from "./services/store";
import BookCategory from "./pages/BookCategory";
import BookView from "./pages/BookView";
import BookControl from "./pages/BookControl";
import Home from "./pages/Home";
import { Switch, Route } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
