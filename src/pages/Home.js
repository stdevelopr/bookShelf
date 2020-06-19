import React from "react";
import ShelfContainer from "../components/ShelfContainer";
import BookItem from "../components/BookItem";
import { useSelector } from "react-redux";

export default function Home() {
  let books = useSelector(state => state.books);
  console.log(books);
  return (
    <ShelfContainer>
      {books ? (
        <div>
          {books.map(book => {
            return <BookItem key={book.id} book={book} />;
          })}
        </div>
      ) : (
        <div>no books...</div>
      )}
    </ShelfContainer>
  );
}
