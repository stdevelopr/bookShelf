import React, { useRef } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "./BookItem.scss";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import { withRouter } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { sagaCommentTypes } from "../store/sagas/comments";

function BookItem({ book, history }) {
  const categories = useSelector(state => state.categories);
  const categoryRef = useRef();
  const dispatch = useDispatch();
  return (
    <Row
      className="row shelf book-item-hover"
      onClick={e => {
        if (!categoryRef.current.contains(e.target)) {
          dispatch({ type: sagaCommentTypes.FETCH_COMMENTS });
          history.push("/book/" + book.id);
        }
      }}
      // history.push("/book/" + book.id)
    >
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
      <Col className="text-center text-md-left not-inherit">
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
                <div className="word-break">{book.title}</div>
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
                <div className="word-break">{book.author}</div>
              </Col>
            </Row>
          </Col>
          <div
            className="category-small-screen category d-md-inline-block"
            ref={categoryRef}
          >
            <Link to={`/category/${book.category}`}>
              {categories[book.category]}
            </Link>
          </div>
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
          <p>{book.description}</p>
        </Row>
      </Col>
    </Row>
  );
}

export default withRouter(BookItem);
