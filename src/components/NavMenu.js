import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./NavMenu.scss";
import { Link } from "react-router-dom";

export default function NavMenu() {
  // const [category, setCategory] = useState(null);
  // const categories = useSelector(state => state.categories);

  return (
    <div>
      <Navbar bg="light" className="navbar">
        <Link to="/">Home</Link>
        <Link to="/control">Create/Edit</Link>
        {/* <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Categories
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(categories).map(key => {
                return (
                  <Dropdown.Item key={key}>
                    {categories[key]}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
      </Navbar>
    </div>
  );
}

// href={`category/${key}`
