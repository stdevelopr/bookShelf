import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import Image from "react-bootstrap/Image";
import "./BookView.scss";
import { useSelector } from "react-redux";

export default function BookView() {
  const bookView1 = useSelector(state => state.bookView);
  console.log("OK", bookView1);
  return (
    <Row className="row shelf">
      <Col md={2} className="text-center">
        <Image
          src="https://picsum.photos/100/100"
          thumbnail
          className="book-pic"
        />
      </Col>
      <Col className="text-center text-md-left">
        <Row>
          <Col className="text-center text-md-left">
            <h3>{bookView1}</h3>
          </Col>
          <div className="d-none category-small-screen category d-md-inline-block">
            Category
          </div>
        </Row>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
          scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in
          vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi
          vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
      </Col>
    </Row>
  );
}
