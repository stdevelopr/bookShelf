import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./BookControl.scss";

export default function BookControl() {
  return (
    <div>
      <Container className="text-center">
        <h3>Create/Edit Books</h3>
        <Row>
          <Col lg={{ order: 2 }} className="books-list">
            Book Items
          </Col>
          <Col lg={8} className="book-create">
            book create
          </Col>
        </Row>
      </Container>
    </div>
  );
}
