import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <div style={{ color: "black" }}>
      <Navbar
        bg="primary"
        className="navbar"
        style={{
          height: "40px",
          justifyContent: "space-between"
        }}
      >
        <Link
          to="/"
          style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
        >
          Home
        </Link>
        <Link
          to="/control"
          style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}
        >
          Create/Edit Books
        </Link>
      </Navbar>
    </div>
  );
}
