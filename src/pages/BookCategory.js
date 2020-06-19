import React from "react";
import { useParams } from "react-router";

export default function BookCategory() {
  const { category } = useParams();
  return <div>Category {category}</div>;
}
