import React, { useState, useEffect } from "react";
import ShelfContainer from "../components/ShelfContainer";
import BookItem from "../components/BookItem";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";

export default function Home() {
  const [orderBy, setOrderBy] = useState("Alphabetical order");
  let books = useSelector(state => state.books);

  books.sort((a, b) => {
    if (orderBy === "Alphabetical order")
      return a["title"].localeCompare(b["title"]);
    else if (orderBy === "Creation date") {
      if (a["timestamp"] < b["timestamp"]) return -1;
      else return 1;
    }
  });

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
          <option>Creation date</option>
        </Form.Control>
      </div>
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
