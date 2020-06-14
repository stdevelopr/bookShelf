import React from "react";
// import logo from "./logo.svg";
import "./App.scss";
import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import BookItem from "./components/BookItem";

function App() {
  return (
    <Container className="app">
      <h3>Book Shelf</h3>
      {["book1", "book2", "book3"].map(book => {
        return <BookItem book={book} />;
      })}
    </Container>
  );
}

export default App;
