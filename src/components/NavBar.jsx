import React, { useState } from "react";
import { Container, Nav, Navbar, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FavoritesCart from "./FavoritesCart";

const NavBar = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (token) {
      setShow(true);
    } else {
      navigate("/login");
    }
  };

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/#/">Ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="/#/">Home</Nav.Link>
              <Nav.Link href="/#/purchases">Purchases</Nav.Link>
              {token ? (
                <Nav.Link as={Button} onClick={logout}>
                  Log out
                </Nav.Link>
              ) : (
                <Nav.Link href="/#/login">Login</Nav.Link>
              )}
              <Nav.Link as={Button} onClick={handleShow}>
                <i className="fa-solid fa-cart-shopping"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <FavoritesCart show={show} handleClose={handleClose} />
    </>
  );
};

export default NavBar;
