import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import BookItem from "../components/BookItem";
import NavMenu from "../components/NavMenu";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../services";

export default function Home() {
  const booksData = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return booksData.loading ? (
    <div>Loading...</div>
  ) : booksData.error ? (
    <Container>
      <h3>Book Shelf</h3>
      <NavMenu />
      <p>{booksData.error}...</p>
    </Container>
  ) : (
    <div>
      <Container>
        <h3>Book Shelf</h3>
        <NavMenu />
        {booksData.books.map(book => {
          return <BookItem book={book} />;
        })}
      </Container>
    </div>
  );
}
