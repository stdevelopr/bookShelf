import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import BookItem from "../components/BookItem";
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
    <h2>{booksData.error}</h2>
  ) : (
    <div>
      <Container>
        <h3>Book Shelf</h3>
        {["book1"].map(book => {
          return <BookItem book={book} />;
        })}
      </Container>
    </div>
  );
}
