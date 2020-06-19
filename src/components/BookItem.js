import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./BookItem.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function BookItem({ book }) {
  const categories = useSelector(state => state.categories);
  return (
    <Row className="row shelf">
      <Col md={2} className="text-center">
        {/* <button onClick={() => setBookView(book)}>Clik</button> */}
        <Link to={`/book/${book.id}`}>
          <Image
            src="https://picsum.photos/100/100"
            thumbnail
            className="book-pic"
          />
        </Link>
        <Link to={`/category/${book.category}`}>
          <div className="category-small-screen category d-md-none">
            {categories[book.category]}
          </div>
        </Link>
      </Col>
      <Col className="text-center text-md-left">
        <Row>
          <Col className="text-center text-md-left">
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </Col>
          <Link to={`/category/${book.category}`}>
            <div className="d-none category-small-screen category d-md-inline-block">
              {categories[book.category]}
            </div>
          </Link>
        </Row>
        <p>{book.description}</p>
      </Col>
    </Row>
  );
}

export default BookItem;
