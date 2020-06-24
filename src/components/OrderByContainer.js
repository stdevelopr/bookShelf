import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function OrderByContainer({
  sortedBooks,
  setSortedBooks,
  category
}) {
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
  }, [orderBy, category]);

  return (
    <Row
      style={{
        display: "inline-block",
        width: "100%",
        marginBottom: "30px",
        marginTop: "10px",
        fontSize: "15px"
      }}
    >
      <div
        style={{
          display: "inline-block",
          marginRight: "20px",
          marginLeft: "20px"
        }}
      >
        Order by
      </div>
      <Form.Control
        as="select"
        className="edit-select-category"
        style={{ width: "200px", display: "inline-block" }}
        value={orderBy}
        onChange={e => {
          setOrderBy(e.target.value);
        }}
      >
        <option>Alphabetical order</option>
        <option>Creation date asc</option>
        <option>Creation date desc</option>
      </Form.Control>
      <div style={{ display: "inline-flex", float: "right", marginTop: "5px" }}>
        <Link to="/category/reading">
          <span style={{ margin: "0px 5px 0px 10px" }}>Reading</span>
          <span
            style={{
              backgroundColor: "#ffca3a",
              display: "inline-block",
              width: "20px",
              height: "20px"
            }}
          ></span>
        </Link>
        <Link to="/category/wantToRead">
          <span style={{ margin: "0px 5px 0px 10px" }}>Want to read</span>
          <span
            style={{
              backgroundColor: "#ff595e",
              display: "inline-block",
              width: "20px",
              height: "20px"
            }}
          ></span>
        </Link>
        <Link to="/category/read">
          <span style={{ margin: "0px 5px 0px 10px" }}>Read</span>
          <span
            style={{
              backgroundColor: "#8ac926",
              display: "inline-block",
              width: "20px",
              height: "20px"
            }}
          ></span>
        </Link>
      </div>
    </Row>
  );
}
