// src/components/Navbar/Navbar.js
import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../auth/AuthContext";
import "./Navbar.css";

const CustomNavbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar
      expand="lg"
      className={`navbar-custom ${scrolled ? "scrolled" : ""}`}
      fixed="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src="/Images/logo.png" alt="Flex Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link as={Link} to="/">{t("home")}</Nav.Link>
            <NavDropdown title="Explore Stays" id="explore-stays-dropdown">
              <NavDropdown.Item as={Link} to="/midStay">Mid Stays</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/longStay">Long Stays</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/blogs">Blog</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/SplitPage">
              <Button className="listPropertyBtn">Become a Host / Invest</Button>
            </Nav.Link>

            {user ? (
              <NavDropdown
                title={<span className="user-avatar">{user.name[0]}</span>}
                id="user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/my-bookings">
                  My Bookings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
              </>
            )}

            <NavDropdown title="Language" id="language-dropdown">
              <NavDropdown.Item onClick={() => changeLanguage("en")}>English</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("tr")}>Türkçe</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("ar")}>العربية</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
