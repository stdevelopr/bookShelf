import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function BookItem({ book }) {
  return (
    <Row className="row">
      <Col xs={2} md={4}>
        <Image src="171x180" thumbnail />
      </Col>
      <Col>{book}</Col>
    </Row>
  );
}
