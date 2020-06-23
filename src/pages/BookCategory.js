import React, { useState } from "react";
import ShelfContainer from "../components/ShelfContainer";
import BookItem from "../components/BookItem";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Form from "react-bootstrap/Form";

export default function BookCategory() {
  const { category } = useParams();
  const [orderBy, setOrderBy] = useState("Alphabetical order");
  const books = useSelector(state =>
    state.books.filter(book => book.category === category)
  );
  const categories = useSelector(state => state.categories);

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

  return (
    <ShelfContainer>
      <div
        style={{
          display: "flex",
          margin: "0px 5px 30px 5px",
          backgroundColor: "burlywood",
          paddingBottom: "10px",
          borderRadius: "0px 0px 10px 10px"
        }}
      >
        <div
          style={{
            display: "inline-block",
            marginRight: "20px",
            marginLeft: "30px",
            color: "white"
          }}
        >
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
      <div className="home-categories">
        <h3>{categories[category]}</h3>
        {books.length > 0 ? (
          <div>
            {books.map(book => {
              return <BookItem key={book.id} book={book} />;
            })}
          </div>
        ) : (
          <div>no books yet...</div>
        )}
      </div>
    </ShelfContainer>
  );
}
