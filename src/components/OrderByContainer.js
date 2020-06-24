import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

export default function OrderByContainer({ sortedBooks, setSortedBooks }) {
  const [orderBy, setOrderBy] = useState("Alphabetical order");

  useEffect(() => {
    sortedBooks.sort((a, b) => {
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
    setSortedBooks([...sortedBooks]);
  }, [orderBy]);

  return (
    <Navbar
      style={{
        display: "inline-block",
        width: "100%",
        textAlign: "center"
      }}
      // bg="primary"
      // variant="dark"
    >
      <div
        style={{
          display: "inline-block",
          marginRight: "20px",
          marginLeft: "20px"
          // color: "white"
        }}
      >
        Order by
      </div>
      <Form.Control
        as="select"
        className="edit-select-category"
        style={{ width: "130px", display: "inline-block" }}
        value={orderBy}
        onChange={e => {
          setOrderBy(e.target.value);
        }}
      >
        <option>Alphabetical order</option>
        <option>Creation date asc</option>
        <option>Creation date desc</option>
      </Form.Control>
    </Navbar>
  );
}
