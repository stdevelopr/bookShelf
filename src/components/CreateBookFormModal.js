import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { sagaBookTypes } from "../store/sagas/books";
import { useToasts } from "react-toast-notifications";
import Alert from "react-bootstrap/Alert";

export default function CreateBookFormModal({
  createModalOpen,
  setCreateModalOpen,
  category
}) {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [titleAlert, setTitleAlert] = useState(false);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  useEffect(() => {
    setBookCategory(categories[category]);

    return setTitleAlert(false);
  }, [category, createModalOpen]);

  const getCategoryKey = value => {
    return (
      Object.keys(categories).find(
        category => categories[category] === value
      ) || null
    );
  };

  const createBook = () => {
    if (!bookTitle) {
      setTitleAlert(true);
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
    handleClose();
    addToast("Created Successfully", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: "3000"
    });
  };

  const handleClose = () => {
    setBookTitle("");
    setBookAuthor("");
    setBookDescription("");
    setBookCategory("");
    setCreateModalOpen(false);
  };

  return (
    <Modal show={createModalOpen} onHide={() => setCreateModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "blue" }}>New book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Form>
            {titleAlert && (
              <Alert variant="danger">You must provide a title.</Alert>
            )}
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            createBook();
          }}
        >
          Save
        </Button>
        <Button variant="secondary" onClick={() => handleClose()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
