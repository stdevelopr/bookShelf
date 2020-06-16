import React from "react";
import Container from "react-bootstrap/Container";
import BookItem from "../components/BookItem";
import NavMenu from "../components/NavMenu";
import { useSelector } from "react-redux";

export default function Home() {
  const booksData = useSelector(state => state);
  return booksData.loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Container>
        <h3>Book Shelf</h3>
        <NavMenu />
        {booksData.books.map(book => {
          return <BookItem key={book.id} book={book} />;
        })}
      </Container>
    </div>
  );
}
