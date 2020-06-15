import React from "react";
import { Provider } from "react-redux";
import store from "./services/store";
import Container from "react-bootstrap/Container";
import BookItem from "./components/BookItem";
import BookView from "./pages/BookView";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route exact path="/">
          <Container className="app">
            <h3>Book Shelf</h3>
            {["book1", "book2", "book3"].map(book => {
              return <BookItem book={book} />;
            })}
          </Container>
        </Route>
        <Route path="/book">
          <BookView book="KKK" />
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
