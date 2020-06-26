import React from "react";
import Row from "react-bootstrap/Row";
import { BsPlusSquare } from "react-icons/bs";

export default function CreateBookIcon({ setCreateModalOpen }) {
  return (
    <Row>
      <div style={{ width: "100%", textAlign: "right" }}>
        <div
          style={{
            marginRight: "20px",
            marginBottom: "5px",
            width: "fit-content",
            display: "inline-block",
            backgroundColor: "#f5f5f587"
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
