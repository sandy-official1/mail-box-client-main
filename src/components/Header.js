import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavLink from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logout = () => {
    alert("logged out succesfull");
    dispatch(authActions.logout());
  };

  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand>Maibox</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!isAuthenticated && (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/composeEmail" className="nav-link">
              Compose
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/inbox" className="nav-link">
              Inbox
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/sent" className="nav-link">
              Sent mail
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/login" className="nav-link" onClick={logout}>
              Logout
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
