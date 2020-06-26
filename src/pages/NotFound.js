import React from "react";
import { Link } from "react-router-dom";
import PageNotFound from "./not-found.jpg";
export default function NotFound() {
  return (
    <div
      style={{ textAlign: "center", backgroundColor: "black", height: "100vh" }}
    >
      <img src={PageNotFound} />
      <p style={{ textAlign: "center" }}>
        <Link to="/">Go to Home </Link>
      </p>
    </div>
  );
}
