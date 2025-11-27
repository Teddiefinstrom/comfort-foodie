import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router";
import AuthModalSwitch from "./Auth/AuthModalSwitch";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth";

function NavbarMeny() {
  const [activeModal, setActiveModal] = useState<"login" | "register" | null>(
    null
  );
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

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
            {!currentUser ? (
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
            ) : (
              <Nav>
                <Button className="btn-login" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMeny;
