import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../user/userSlice";

function Header() {
  const dispatch = useDispatch();
  return (
    <Nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Nav.Item>
        <Nav.Link eventKey="user-home" href="/user-home">
          Navbar
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="todos-list" href="/todos-list">
          TODO List
        </Nav.Link>
      </Nav.Item>
      <NavDropdown className="ms-auto" title="Name" id="nav-dropdown">
        <NavDropdown.Item
          eventKey="Logout"
          href="/logout"
          onClick={dispatch(logout())}
        >
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
}

export default Header;
