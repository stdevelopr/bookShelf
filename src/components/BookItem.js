import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./BookItem.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import types from "../reducers/books";
const { setBookView } = types;

function BookItem({ book }) {
  const dispatch = useDispatch();
  return (
    <Row className="row shelf">
      <Col md={2} className="text-center">
        {/* <button onClick={() => setBookView(book)}>Clik</button> */}
        <Link to="/book" onClick={() => dispatch(setBookView(book))}>
          <Image
            src="https://picsum.photos/100/100"
            thumbnail
            className="book-pic"
          />
        </Link>
        <div className="category-small-screen category d-md-none">Category</div>
      </Col>
      <Col className="text-center text-md-left">
        <Row>
          <Col className="text-center text-md-left">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </Col>
          <div className="d-none category-small-screen category d-md-inline-block">
            {book.category}
          </div>
        </Row>
        <p>{book.description}</p>
      </Col>
    </Row>
  );
}

export default BookItem;
