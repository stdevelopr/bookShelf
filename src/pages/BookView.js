import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import BookItemEditable from "../components/BookItemEditable";
import "./BookView.scss";
import { useSelector, useDispatch } from "react-redux";
import { withRouter, useParams } from "react-router";
import ShelfContainer from "../components/ShelfContainer";
import CommentsContainer from "../components/CommentsContainer";
import { sagaCommentTypes } from "../store/sagas/comments";

function BookView(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const book = useSelector(
    state => state.books.filter(book => book.id === id)[0]
  );
  const categories = useSelector(state => state.categories);
  // dispatch({ type: sagaCommentTypes.FETCH_COMMENTS });

  useEffect(() => {
    dispatch({ type: sagaCommentTypes.FETCH_COMMENTS });
  }, []);

  return (
    <ShelfContainer>
      <div>
        {book ? (
          <div key={book.id}>
            <BookItemEditable book={book} />
          </div>
        ) : (
          <div>
            <p>select a book</p>
          </div>
        )}
      </div>
      <CommentsContainer parentId={id} />
    </ShelfContainer>
  );
}

export default withRouter(BookView);
