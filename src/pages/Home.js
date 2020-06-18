import React from "react";
import ShelfContainer from "../components/ShelfContainer";
import BookItem from "../components/BookItem";
import { useSelector } from "react-redux";

export default function Home() {
  const booksData = useSelector(state => state);
  return (
    <ShelfContainer>
      {booksData.loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {booksData.books.map(book => {
            return <BookItem key={book.id} book={book} />;
          })}
        </div>
      )}
    </ShelfContainer>
  );
}
