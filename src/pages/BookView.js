import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./BookView.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../services";
import { withRouter } from "react-router";

function BookView(props) {
  const book = useSelector(state => state.bookView);
  const dispatch = useDispatch();
  return (
    <div>
      {book ? (
        <Row className="row shelf">
          <Col md={2} className="text-center">
            <Image
              src="https://picsum.photos/100/100"
              thumbnail
              className="book-pic"
            />
          </Col>
          <Col className="text-center text-md-left">
            <Row>
              <Col className="text-center text-md-left">
                <h3>{book.title}</h3>
              </Col>
              <div className="d-none category-small-screen category d-md-inline-block">
                Category
              </div>
            </Row>
            <p>{book.description}</p>
            <button
              onClick={() => {
                dispatch(deleteBook(book.id));
                props.history.push("/");
              }}
            >
              delete
            </button>
          </Col>
        </Row>
      ) : (
        <p>select a book</p>
      )}
    </div>
  );
}

export default withRouter(BookView);
