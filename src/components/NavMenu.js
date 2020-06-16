import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./NavMenu.scss";
import { Link } from "react-router-dom";

export default function NavMenu() {
  return (
    <div>
      <Navbar bg="light" className="navbar">
        <Link to="/">Home</Link>
        <Link to="/control">Create</Link>
      </Navbar>
    </div>
  );
}
