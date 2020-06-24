import React, { useRef, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import "./BookItem.scss";

function BookItem({ book, history, showCategory }) {
  const categories = useSelector(state => state.categories);
  const categoryRef = useRef();

  return (
    <Row
      className="row shelf book-item-hover"
      onClick={e => {
        if (!categoryRef.current.contains(e.target)) {
          history.push("/book/" + book.id);
        }
      }}
    >
      <Col className="text-center text-md-left not-inherit">
        <Row style={{ marginTop: "30px" }}>
          <Col className="text-center text-md-left">
            <Row
              style={{
                fontSize: "20px",
                fontFamily: "monospace"
              }}
            >
              <Col
                md={2}
                style={{
                  fontSize: "20px",
                  textAlign: "center",
                  margin: "auto"
                }}
              >
                <div>Title:</div>
              </Col>
              <Col md={10}>
                <div
                  className="word-break"
                  style={{ borderBottom: "1px dashed" }}
                >
                  {book.title}
                </div>
              </Col>
            </Row>
            <Row
              style={{
                fontFamily: "monospace",
                fontSize: "20px"
              }}
            >
              <Col
                md={2}
                style={{
                  textAlign: "center",
                  margin: "auto"
                }}
              >
                <div>Author:</div>
              </Col>
              <Col md={10}>
                <div
                  className="word-break"
                  style={{ borderBottom: "1px dashed", minHeight: "30px" }}
                >
                  {book.author}
                </div>
              </Col>
            </Row>
          </Col>
          {showCategory ? (
            <div
              className="category-small-screen category d-md-inline-block"
              ref={categoryRef}
            >
              <Link
                to={`/category/${book.category}`}
                style={{ padding: "0px 0px" }}
              >
                {categories[book.category]}
              </Link>
            </div>
          ) : (
            <div
              ref={categoryRef}
              onClick={() => history.push("/book/" + book.id)}
              className="category-small-screen category no-link d-md-inline-block"
            >
              {categories[book.category]}
            </div>
          )}
        </Row>
        <div
          style={{
            marginTop: "30px",
            fontSize: "20px",
            textAlign: "center",
            fontFamily: "monospace"
          }}
        >
          Description:
        </div>
        <div
          className="desc"
          style={{
            margin: "30px",
            marginTop: "10px",
            textAlign: "center",
            borderBottom: "1px dashed",
            minHeight: "20px",
            fontFamily: "monospace"
          }}
        >
          {book.description}
        </div>
        <div>
          {new Date(book.timestamp).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          })}
        </div>
      </Col>
    </Row>
  );
}

export default withRouter(BookItem);
