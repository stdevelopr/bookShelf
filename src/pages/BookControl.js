import React, { useState } from "react";
import NavMenu from "../components/NavMenu";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./BookControl.scss";
import { useDispatch, useSelector } from "react-redux";
import { sagaBookTypes, getBookById } from "../store/sagas/books";

export default function BookControl() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [action, setAction] = useState("Create");
  const [editBookId, setEditBookId] = useState("");
  const booksData = useSelector(state => state.books);
  const categories = useSelector(state => state.categories);

  const dispatch = useDispatch();
  const setBook = bookId => {
    let book = getBookById(bookId);
    setBookTitle(book.title);
    setBookAuthor(book.author);
    setBookDescription(book.description);
    setBookCategory(categories[book.category]);
    setAction("Save");
    setEditBookId(book.id);
  };

  const getCategoryKey = value => {
    return (
      Object.keys(categories).find(
        category => categories[category] === value
      ) || null
    );
  };

  return (
    <div>
      <Container className="text-center">
        <h3>Create/Edit Books</h3>
        <NavMenu />
        <Row>
          <Col lg={{ order: 2 }} className="books-list">
            {booksData.map(book => {
              return (
                <div
                  id={book.id}
                  key={book.id}
                  onClick={e => setBook(e.target.getAttribute("id"))}
                >
                  {book.title}
                </div>
              );
            })}
          </Col>
          <Col lg={8} className="book-create">
            <Form
              onSubmit={e => {
                e.preventDefault();
                action === "Create"
                  ? dispatch({
                      type: sagaBookTypes.ADD_NEW_BOOK,
                      payload: {
                        title: bookTitle ? bookTitle : "null",
                        author: bookAuthor,
                        description: bookDescription,
                        category: getCategoryKey(bookCategory),
                        deleted: false
                      }
                    })
                  : dispatch({
                      type: sagaBookTypes.EDIT_BOOK,
                      payload: {
                        id: editBookId,
                        title: bookTitle,
                        author: bookAuthor,
                        description: bookDescription,
                        category: getCategoryKey(bookCategory),
                        deleted: false
                      }
                    });
              }}
            >
              <Form.Group as={Col} controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  value={bookCategory}
                  onChange={e => {
                    setBookCategory(e.target.value);
                  }}
                >
                  <option>Choose...</option>
                  {Object.keys(categories).map(key => {
                    return <option key={key}>{categories[key]}</option>;
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="bookTitle">
                <Form.Label>Book Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the name of the book"
                  name="title"
                  value={bookTitle}
                  onChange={e => setBookTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="bookAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the description of the book"
                  name="description"
                  value={bookAuthor}
                  onChange={e => setBookAuthor(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="bookDescription">
                <Form.Label>Book Description</Form.Label>

                <Form.Control
                  as="textarea"
                  rows="3"
                  placeholder="Enter the description of the book"
                  name="description"
                  value={bookDescription}
                  onChange={e => setBookDescription(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                {action}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
