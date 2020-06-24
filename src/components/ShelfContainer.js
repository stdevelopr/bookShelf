import React from "react";
import Container from "react-bootstrap/Container";
import NavMenu from "../components/NavMenu";

export default function ShelfContainer({ children }) {
  return (
    <Container>
      <div
        style={{
          fontSize: "50px",
          marginLeft: "20px",
          fontFamily: "Londrina Shadow, cursive",
          textAlign: "center"
        }}
        className="logo-title"
      >
        <p style={{ padding: "0px", margin: "0px" }}>Books Shelf</p>
      </div>
      <NavMenu />
      {children}
    </Container>
  );
}
