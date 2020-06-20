import React, { useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import "./BookItemEditable.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "./logo.png";

function BookItemEditable({ book }) {
  const categories = useSelector(state => state.categories);
  const [edit, setEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(book.title);
  const [editDescription, setEditDescription] = useState(book.description);
  const [editCategory, setEditCategory] = useState(categories[book.category]);
  const titleRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();

  const cancelEditing = () => {
    setEdit(false);
    titleRef.current.innerHTML = book.title;
    authorRef.current.innerHTML = book.author;
    descriptionRef.current.innerHTML = book.description;
  };
  return (
    <div>
      <Row className="row shelf">
        {/* <Col md={2} className="text-center">
          {edit ? (
            <div className="category-small-screen category d-md-none">
              {categories[book.category]}
            </div>
          ) : (
            <Link to={`/category/${book.category}`}>
              <div className="category-small-screen category d-md-none">
                {categories[book.category]}
              </div>
            </Link>
          )}
          <Image
            src={logo}
            thumbnail
            className="book-pic"
            style={{ marginTop: "30px" }}
          />
        </Col> */}
        <Col className="text-center text-md-left">
          <Row style={{ marginTop: "30px" }}>
            <Col className="text-center text-md-left">
              <Row>
                <Col
                  md={2}
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    textAlign: "center",
                    margin: "auto"
                  }}
                >
                  <div>Title</div>
                </Col>
                <Col md={10} style={{ fontSize: "20px" }}>
                  <div
                    ref={titleRef}
                    contentEditable={edit}
                    suppressContentEditableWarning={true}
                    className="word-break"
                  >
                    {book.title}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  md={2}
                  style={{
                    fontSize: "20px",
                    color: "blue",
                    textAlign: "center",
                    margin: "auto"
                  }}
                >
                  <div>Author</div>
                </Col>
                <Col md={10} style={{ fontSize: "20px" }}>
                  <div
                    ref={authorRef}
                    contentEditable={edit}
                    suppressContentEditableWarning={true}
                    className="word-break"
                  >
                    {book.author}
                  </div>
                </Col>
              </Row>
            </Col>
            {edit ? (
              <div className="category-small-screen category d-md-inline-block">
                {categories[book.category]}

                {/* <Form.Control
                  as="select"
                  className="edit-select-category"
                  value={editCategory}
                  onChange={e => {
                    setEditCategory(e.target.value);
                  }}
                >
                  <option>Choose...</option>
                  {Object.keys(categories).map(key => {
                    return <option key={key}>{categories[key]}</option>;
                  })}
                </Form.Control> */}
              </div>
            ) : (
              <Link to={`/category/${book.category}`}>
                <div className="category-small-screen category d-md-inline-block">
                  {categories[book.category]}
                </div>
              </Link>
            )}
          </Row>
          <div
            style={{
              marginTop: "30px",
              fontSize: "20px",
              color: "blue",
              textAlign: "center"
            }}
          >
            Description
          </div>
          <Row style={{ margin: "30px", marginTop: "10px" }}>
            <p
              ref={descriptionRef}
              contentEditable={edit}
              suppressContentEditableWarning={true}
            >
              {editDescription}
            </p>
          </Row>
          <div className="edit-item-button">
            <button onClick={() => setEdit(true)}>Edit</button>
            <button onClick={() => cancelEditing()}>Cancel</button>
          </div>
        </Col>
        <p></p>
      </Row>
    </div>
  );
}

export default BookItemEditable;
