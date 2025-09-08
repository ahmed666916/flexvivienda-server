import React, { useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../../context/AuthContext';  // ✅ import AuthContext
import './Navbar.css';

const CustomNavbar = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useContext(AuthContext); // ✅ get user + logout
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/Images/logo.png" alt="Flex Logo" className="navbar-logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto align-items-center">
            <Nav.Link as={Link} to="/">{t('home')}</Nav.Link>
            <NavDropdown title="Explore Stays" id="explore-stays-dropdown">
              <NavDropdown.Item as={Link} to="/midStay">Mid Stays</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/LongStay">Long Stays</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/blogs">Blog</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>

          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/SplitPage">
              <Button className="listPropertyBtn">Become a Host / Invest</Button>
            </Nav.Link>

            {/* ✅ If user is logged in → show initials dropdown */}
            {user ? (
              <NavDropdown
                title={
                  <span className="user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </span>
                }
                id="user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/my-bookings">My Bookings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>

              </>
            )}

            <NavDropdown title="Language" id="language-dropdown">
              <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('tr')}>Türkçe</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('ar')}>العربية</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
