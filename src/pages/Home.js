import React from "react";
import Container from "react-bootstrap/Container";
import ShelfContainer from "../components/ShelfContainer";
import BookItem from "../components/BookItem";
import NavMenu from "../components/NavMenu";
import { useSelector } from "react-redux";

export default function Home() {
  const booksData = useSelector(state => state);
  console.log(booksData);
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
