import React, { useState, useEffect } from "react";
import ShelfContainer from "../components/ShelfContainer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from "react-redux";
import { sagaBookTypes, getBookById } from "../store/sagas/books";
import { useToasts } from "react-toast-notifications";
import "./BookControl.scss";

export default function BookControl() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [action, setAction] = useState("Create");
  const [editBookId, setEditBookId] = useState("");
  const [titleAlert, setTitleAlert] = useState(false);
  const [sortedBooks, setSortedBooks] = useState([]);
  const booksData = useSelector(state => state.books);
  const categories = useSelector(state => state.categories);

  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    booksData.sort((a, b) => {
      return a["title"].localeCompare(b["title"]);
    });
    setSortedBooks(booksData);
  }, [booksData]);

  // fill the fields after a book is selected from the list
  const setBook = bookId => {
    let book = getBookById(bookId);
    setBookTitle(book.title);
    setBookAuthor(book.author);
    setBookDescription(book.description);
    setBookCategory(categories[book.category]);
    setAction("Save");
    setEditBookId(book.id);
  };

  const clearForm = () => {
    setBookTitle("");
    setBookAuthor("");
    setBookDescription("");
    setBookCategory("");
    setTitleAlert(false);
  };

  const createBookHook = () => {
    if (!bookTitle) {
      setTitleAlert(true);
      addToast("You must provide a title for the book", {
        appearance: "error",
        autoDismiss: true,
        autoDismissTimeout: "3000"
      });
      return;
    }
    dispatch({
      type: sagaBookTypes.ADD_NEW_BOOK,
      payload: {
        title: bookTitle ? bookTitle : "null",
        author: bookAuthor,
        description: bookDescription,
        category: getCategoryKey(bookCategory),
        deleted: false
      }
    });
    addToast("Created Successfully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: "3000"
    });
  };

  const editBookHook = () => {
    dispatch({
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
      <ShelfContainer>
        <Row>
          <Col lg={{ order: 2 }} className="books-list">
            <table style={{ width: "100%" }}>
              <tbody>
                {sortedBooks.map(book => {
                  return (
                    <tr
                      key={book.id}
                      style={{ backgroundColor: "white" }}
                      onClick={e => setBook(e.target.getAttribute("id"))}
                    >
                      <td id={book.id}>{book.title}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Col>
          <Col lg={8}>
            <div
              style={{
                marginTop: "20px",
                border: "solid 1px #00000036",
                padding: "20px"
              }}
            >
              <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Form.Label column sm={2}>
                    Title
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="title"
                      placeholder="Title"
                      value={bookTitle}
                      style={{ border: titleAlert ? "1px solid red" : "" }}
                      onChange={e => {
                        setBookTitle(e.target.value);
                        setTitleAlert(false);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Form.Label column sm={2}>
                    Author
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control
                      type="author"
                      value={bookAuthor}
                      onChange={e => setBookAuthor(e.target.value)}
                      placeholder="Author"
                    />
                  </Col>
                </Form.Group>
                <fieldset>
                  <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                      Category
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Check
                        type="radio"
                        label="Currently Reading"
                        name="Currently Reading"
                        id="Currently Reading"
                        onChange={e =>
                          setBookCategory(e.target.getAttribute("name"))
                        }
                        checked={bookCategory === "Currently Reading"}
                      />
                      <Form.Check
                        type="radio"
                        label="Want to Read"
                        name="Want to Read"
                        id="Want to Read"
                        onChange={e =>
                          setBookCategory(e.target.getAttribute("name"))
                        }
                        checked={bookCategory === "Want to Read"}
                      />
                      <Form.Check
                        type="radio"
                        label="Read"
                        name="Read"
                        id="Read"
                        onChange={e =>
                          setBookCategory(e.target.getAttribute("name"))
                        }
                        checked={bookCategory === "Read"}
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    value={bookDescription}
                    onChange={e => setBookDescription(e.target.value)}
                  />
                </Form.Group>
              </Form>
              <Button
                variant="success"
                size="md"
                onClick={() =>
                  action === "Create" ? createBookHook() : editBookHook()
                }
              >
                Save
              </Button>{" "}
              <Button variant="secondary" size="md" onClick={() => clearForm()}>
                Cancel
              </Button>{" "}
            </div>
          </Col>
        </Row>
      </ShelfContainer>
    </div>
  );
}
