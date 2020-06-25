import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import { BsPlusSquare } from "react-icons/bs";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function CreateBookIcon({ setCreateModalOpen }) {
  return (
    <Row>
      <div style={{ width: "100%", textAlign: "right" }}>
        <div
          style={{
            marginRight: "20px",
            marginBottom: "5px",
            width: "fit-content",
            display: "inline-block"
          }}
          onClick={() => setCreateModalOpen(true)}
        >
          Add new item
          <BsPlusSquare
            style={{
              fontSize: "25px",
              marginLeft: "15px",
              backgroundColor: "#eaedf5"
            }}
          />
        </div>
      </div>
    </Row>
  );
}
