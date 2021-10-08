import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function Navigation() {
  const { currentUser } = useAuth();

  return (
    <div>
      <Navbar variant="dark" bg="secondary" expand="md">
        <Navbar.Brand href="#/">Todo List App</Navbar.Brand>
        {/* hamburger button */}
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Nav className="mr-auto">
              <Nav.Link href="#/todoitems">Todo Items</Nav.Link>
              <Nav.Link href="#/categories">Categories</Nav.Link>
              {!currentUser && <Nav.Link href="#/login">Login</Nav.Link>}
            </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
