import React, { useState, useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { sagaBookTypes } from "../store/sagas/books";
import { RiDeleteBin2Line } from "react-icons/ri";
import "./BookItemEditable.scss";

function BookItemEditable({ book, history }) {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);
  const [edit, setEdit] = useState(false);
  const [editCategory, setEditCategory] = useState(categories[book.category]);
  const titleRef = useRef();
  const authorRef = useRef();
  const descriptionRef = useRef();
  const edit_border = edit ? "edit-border" : "";

  const cancelEditing = () => {
    setEdit(false);
    titleRef.current.innerHTML = book.title;
    authorRef.current.innerHTML = book.author;
    descriptionRef.current.innerHTML = book.description;
  };

  const getCategoryKey = value => {
    return (
      Object.keys(categories).find(
        category => categories[category] === value
      ) || null
    );
  };

  const strip_html_tags = str => {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, " ");
  };

  const editBook = () => {
    dispatch({
      type: sagaBookTypes.EDIT_BOOK,
      payload: {
        id: book.id,
        title: strip_html_tags(titleRef.current.innerHTML),
        author: strip_html_tags(authorRef.current.innerHTML),
        description: strip_html_tags(descriptionRef.current.innerHTML),
        category: getCategoryKey(editCategory),
        deleted: false
      }
    });
    setEdit(false);
  };
  return (
    <div>
      <Row className="row" style={{ border: "solid 1px", marginTop: "10px" }}>
        <Col>
          {edit ? (
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "inline-block" }}>
                <Form.Control
                  as="select"
                  value={editCategory}
                  onChange={e => {
                    setEditCategory(e.target.value);
                  }}
                  style={{
                    marginTop: "10px",
                    height: "30px",
                    fontSize: "10px",
                    width: "200px"
                  }}
                >
                  <option>Choose a category...</option>
                  {Object.keys(categories).map(key => {
                    return <option key={key}>{categories[key]}</option>;
                  })}
                </Form.Control>
              </div>
            </div>
          ) : (
            <div style={{ margin: "10px 0px 20px 0px", textAlign: "right" }}>
              <Link to={`/category/${book.category}`}>
                {categories[book.category]}
              </Link>
            </div>
          )}
          <Row>
            <Col
              className="text-center text-md-left"
              style={{ margin: "20px" }}
            >
              <Row>
                <Col
                  md={2}
                  style={{
                    textAlign: "center",
                    margin: "auto"
                  }}
                >
                  <div style={{ fontStyle: "italic" }}>Title:</div>
                </Col>
                <Col md={10}>
                  <div
                    ref={titleRef}
                    contentEditable={edit}
                    suppressContentEditableWarning={true}
                    className={`word-break ${edit_border}`}
                    style={{
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                      fontSize: "large"
                    }}
                  >
                    {book.title}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col
                  md={2}
                  style={{
                    textAlign: "center",
                    margin: "auto"
                  }}
                >
                  <div style={{ fontStyle: "italic" }}>Author:</div>
                </Col>
                <Col md={10}>
                  <div
                    ref={authorRef}
                    contentEditable={edit}
                    suppressContentEditableWarning={true}
                    className={`word-break ${edit_border}`}
                    style={{ fontFamily: "monospace", fontSize: "large" }}
                  >
                    {book.author}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col
              className="text-center text-md-left"
              style={{ margin: "20px" }}
            >
              <Row>
                <Col
                  md={2}
                  style={{
                    textAlign: "center",
                    margin: "auto"
                  }}
                >
                  <div style={{ fontStyle: "italic" }}>Description:</div>
                </Col>
                <Col md={10}>
                  <div
                    ref={descriptionRef}
                    contentEditable={edit}
                    suppressContentEditableWarning={true}
                    className={`word-break ${edit_border}`}
                    style={{ fontFamily: "monospace", fontSize: "large" }}
                  >
                    {book.description}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ margin: "20px" }}>
            <div style={{ margin: "30px", width: "100%", textAlign: "right" }}>
              <div style={{ display: "inline-block", marginRight: "10px" }}>
                <Button
                  variant={edit ? "success" : "secondary"}
                  onClick={() => {
                    edit ? editBook() : setEdit(true);
                  }}
                  style={{ marginRight: "3px" }}
                >
                  {edit ? "Save" : "Edit"}
                </Button>
                {edit && (
                  <Button variant="secondary" onClick={() => cancelEditing()}>
                    Cancel
                  </Button>
                )}
              </div>

              <Button
                variant="danger"
                onClick={() => {
                  dispatch({
                    type: sagaBookTypes.DELETE_BOOK,
                    payload: book.id
                  });
                  history.push("/");
                }}
              >
                Delete
              </Button>
            </div>
            <div
              style={{
                width: "100%",
                textAlign: "right",
                fontFamily: "monospace"
              }}
            >
              Created at:{" "}
              {new Date(book.timestamp).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default withRouter(BookItemEditable);
