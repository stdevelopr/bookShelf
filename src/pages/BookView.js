import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./BookView.scss";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router";
import ShelfContainer from "../components/ShelfContainer";
import { sagaTypes } from "../store/sagas/books";

function BookView(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const book = useSelector(
    state => state.books.filter(book => book.id === id)[0]
  );

  return (
    <ShelfContainer>
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
                  <p>{book.author}</p>
                </Col>
                <div className="d-none category-small-screen category d-md-inline-block">
                  {book.category}
                </div>
              </Row>
              <p>{book.description}</p>
              <button
                onClick={() => {
                  dispatch({ type: sagaTypes.DELETE_BOOK, payload: book.id });
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
    </ShelfContainer>
  );
}

export default withRouter(BookView);
