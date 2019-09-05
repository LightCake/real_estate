import React from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./navbar.css";

class NavBar extends React.Component {
  logoutUser = event => {
    event.preventDefault();
    this.props.logout();
  };
  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="navbar-links-container">
          <NavLink
            to={"/sell"}
            className="navbar-link"
            activeClassName="navbar-link-selected"
          >
            List New Property
          </NavLink>
          <NavLink
            to={"/saved"}
            className="navbar-link"
            activeClassName="navbar-link-selected"
          >
            Saved
          </NavLink>
          <NavLink
            to={"/sold"}
            className="navbar-link"
            activeClassName="navbar-link-selected"
          >
            Sold
          </NavLink>
          <button onClick={this.logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="navbar-links-container">
          <NavLink
            to={"/signup"}
            className="navbar-link"
            activeClassName="navbar-link-selected"
          >
            Signup
          </NavLink>
          <NavLink
            to={"/login"}
            className="navbar-link"
            activeClassName="navbar-link-selected"
          >
            Login
          </NavLink>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar">
        <Link to="/">
          <img src={Logo} alt="logo" className="navbar-logo" />
        </Link>
        <div className="navbar-links-container">
          <NavLink
            to={"/properties"}
            className="navbar-link"
            activeClassName="navbar-link-selected"
          >
            All Properties
          </NavLink>
          {this.getLinks()}
        </div>
      </div>
    );
  }
}

export default NavBar;
