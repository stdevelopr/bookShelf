import React, { useState, useEffect } from "react";
import ShelfContainer from "../components/ShelfContainer";
import BookItem from "../components/BookItem";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import "./Home.scss";

export default function Home() {
  const [orderBy, setOrderBy] = useState("Alphabetical order");
  let books = useSelector(state => state.books);

  books.sort((a, b) => {
    if (orderBy === "Alphabetical order")
      return a["title"].localeCompare(b["title"]);
    else if (orderBy === "Creation date asc") {
      if (a["timestamp"] < b["timestamp"]) return -1;
      else return 1;
    } else if (orderBy === "Creation date desc") {
      if (a["timestamp"] > b["timestamp"]) return -1;
      else return 1;
    }
  });

  const nullBooksCategory = books.filter(book => book.category === null);
  const readingBooksCategory = books.filter(
    book => book.category === "reading"
  );
  const wantToReadBooksCategory = books.filter(
    book => book.category === "wantToRead"
  );
  const readBooksCategory = books.filter(book => book.category === "read");

  return (
    <ShelfContainer>
      <div style={{ display: "flex", margin: "20px 0px 30px 0px" }}>
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          Order by
        </div>
        <Form.Control
          as="select"
          className="edit-select-category"
          style={{ width: "200px" }}
          value={orderBy}
          onChange={e => {
            setOrderBy(e.target.value);
          }}
        >
          <option>Alphabetical order</option>
          <option>Creation date asc</option>
          <option>Creation date desc</option>
        </Form.Control>
      </div>
      <div>
        {nullBooksCategory.map(book => {
          return <BookItem key={book.id} book={book} />;
        })}
      </div>
      <div className="home-categories">
        <Link to={`/category/reading`}>
          <h3>Currently Reading</h3>
        </Link>
        {readingBooksCategory.length > 0 ? (
          <div>
            {readingBooksCategory
              .filter(book => book.category === "reading")
              .map(book => {
                return <BookItem key={book.id} book={book} />;
              })}
          </div>
        ) : (
          <div>no books in this category...</div>
        )}
      </div>

      <div className="home-categories">
        <Link to={`/category/wantToRead`}>
          <h3>Want to read</h3>
        </Link>

        {wantToReadBooksCategory.length > 0 ? (
          <div>
            {wantToReadBooksCategory
              .filter(book => book.category === "wantToRead")
              .map(book => {
                return <BookItem key={book.id} book={book} />;
              })}
          </div>
        ) : (
          <div>no books in this category...</div>
        )}
      </div>
      <div className="home-categories">
        <Link to={`/category/read`}>
          <h3>Read</h3>
        </Link>
        {readBooksCategory.length > 0 ? (
          <div>
            {readBooksCategory
              .filter(book => book.category === "read")
              .map(book => {
                return <BookItem key={book.id} book={book} />;
              })}
          </div>
        ) : (
          <div>no books in this category...</div>
        )}
      </div>
    </ShelfContainer>
  );
}
