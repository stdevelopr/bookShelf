import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./BookItem.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBookView } from "../services";

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
            <h3>{book}</h3>
          </Col>
          <div className="d-none category-small-screen category d-md-inline-block">
            Category
          </div>
        </Row>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
      </Col>
    </Row>
  );
}

export default BookItem;