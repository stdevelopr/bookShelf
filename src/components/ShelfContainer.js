import React from "react";
import Container from "react-bootstrap/Container";
import NavMenu from "../components/NavMenu";

export default function ShelfContainer({ children }) {
  return (
    <Container>
      <h3>Book Shelf</h3>
      <NavMenu />
      {children}
    </Container>
  );
}
