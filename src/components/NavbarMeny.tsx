import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router";
import AuthModalSwitch from "./Auth/AuthModalSwitch";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import useAuth from "../hooks/useAuth";
import profilePic from "../styling/images/cf-default-profile.png";

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
            <Nav className="ms-lg-3 gap-3">
              <Nav.Link as={Link} to="/recipes">
                Recipes
              </Nav.Link>
              <Nav.Link as={Link} to="/ingredients">
                Ingredients
              </Nav.Link>
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              {currentUser && (
                <Nav.Link as={Link} to="/profile/recipes">
                  Saved Recipes
                </Nav.Link>
              )}
            </Nav>
            {!currentUser ? (
              <Nav className="ms-lg-auto nav-btns gap-2">
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
              <Nav className="ms-lg-auto">
                <NavDropdown
                  align="end"
                  className="nav-profile-dropdown"
                  title={
                    <img
                      src={currentUser?.photoURL || profilePic}
                      alt="profile"
                      className="nav-avatar"
                    />
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/profile/recipes">
                    My recipes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/">
                    <Button className="btn-login" onClick={handleLogout}>
                      Logout
                    </Button>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarMeny;
