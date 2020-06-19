import React from "react";
import ShelfContainer from "../components/ShelfContainer";
import BookItem from "../components/BookItem";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function BookCategory() {
  const { category } = useParams();
  const books = useSelector(state =>
    state.books.filter(book => book.category === category)
  );
  return (
    <ShelfContainer>
      {books.length > 0 ? (
        <div>
          {books.map(book => {
            return <BookItem key={book.id} book={book} />;
          })}
        </div>
      ) : (
        <div>no books in the category {category}</div>
      )}
    </ShelfContainer>
  );
}
