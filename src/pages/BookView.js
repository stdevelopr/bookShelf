import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./BookView.scss";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router";
import ShelfContainer from "../components/ShelfContainer";
import Comments from "../components/Comments";
import { sagaBookTypes } from "../store/sagas/books";
import { sagaCommentTypes } from "../store/sagas/comments";

function BookView(props) {
  const dispatch = useDispatch();
  dispatch({ type: sagaCommentTypes.FETCH_COMMENTS });
  const { id } = useParams();
  const book = useSelector(
    state => state.books.filter(book => book.id === id)[0]
  );
  const categories = useSelector(state => state.categories);

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
                  {categories[book.category]}
                </div>
              </Row>
              <p>{book.description}</p>
              <button
                onClick={() => {
                  dispatch({
                    type: sagaBookTypes.DELETE_BOOK,
                    payload: book.id
                  });
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
      <Comments parentId={id} />
    </ShelfContainer>
  );
}

export default withRouter(BookView);
