import React, { useEffect } from "react";
import BookItemEditable from "../components/BookItemEditable";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import ShelfContainer from "../components/ShelfContainer";
import CommentsContainer from "../components/CommentsContainer";
import { sagaCommentTypes } from "../store/sagas/comments";

function BookView() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const book = useSelector(
    state => state.books.filter(book => book.id === id)[0]
  );

  useEffect(() => {
    dispatch({ type: sagaCommentTypes.FETCH_COMMENTS });
  });

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

export default BookView;
