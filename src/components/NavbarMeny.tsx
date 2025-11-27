import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router";
import AuthModalSwitch from "./AuthModalSwitch";
//import "../styling/scss/components/_navbarMeny.scss";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";

function NavbarMeny() {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null
  );

  return (
    <>
      <AuthModalSwitch
        activeModal={activeModal}
        setActiveModal={setActiveModal}
      />

      <Navbar collapseOnSelect expand="lg" className="navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Comfort Foodie
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/recipes">
                Recipies
              </Nav.Link>
              <Nav.Link as={Link} to="/ingrediens">
                Ingrediens
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
            </Nav>

            <Nav className="nav-btns">
              <Button
              className="btn-register"
                variant="outline-dark"
                onClick={() => setActiveModal("register")}
              >
                Signup
              </Button>

              <Button
              className="btn-login"
                variant="success"
                onClick={() => setActiveModal("login")}
              >
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMeny;
