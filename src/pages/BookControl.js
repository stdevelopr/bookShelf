import React, { useState } from "react";
import NavMenu from "../components/NavMenu";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./BookControl.scss";
import { useDispatch, useSelector } from "react-redux";
import { addNewBook } from "../services";

export default function BookControl() {
  const [bookName, setBookName] = useState("");
  const booksData = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <div>
      <Container className="text-center">
        <h3>Create/Edit Books</h3>
        <NavMenu />
        <Row>
          <Col lg={{ order: 2 }} className="books-list">
            {booksData.books.map(book => {
              return <div>{book}</div>;
            })}
          </Col>
          <Col lg={8} className="book-create">
            <Form
              onSubmit={e => {
                e.preventDefault();
                dispatch(addNewBook(bookName));
              }}
            >
              <Form.Group controlId="bookName">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the name of the book"
                  name="book"
                  value={bookName}
                  onChange={e => setBookName(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
