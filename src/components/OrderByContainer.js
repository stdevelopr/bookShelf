import React from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function OrderByContainer({ setOrderBy, orderBy }) {
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
        style={{ width: "200px", display: "inline-block", fontSize: "14px" }}
        value={orderBy}
        onChange={e => {
          setOrderBy(e.target.value);
        }}
      >
        <option>Alphabetical order</option>
        <option>Creation date asc</option>
        <option>Creation date desc</option>
      </Form.Control>
      <div
        style={{
          display: "inline-flex",
          float: "right",
          marginTop: "5px",
          marginLeft: "20px"
        }}
      >
        <Link to="/category/reading">
          <span style={{ margin: "0px 5px 0px 10px" }}>Currently Reading</span>
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
          <span style={{ margin: "0px 5px 0px 10px" }}>Want to Read</span>
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
