import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";

import "./Navbar.css";

const Navbar = ({ handleClick, isLoggedIn }) => {
  return (
    <div className="header">
      <h1 id="logo">
        <a href="/home">NFT </a>
      </h1>
      <nav>
        {isLoggedIn ? (
          <div className="nav-links">
            {/* The navbar will show these links after you log in */}
            <ul className="nav-list">
              <li className="nav-item">
                {" "}
                <a href="/home" className="home-btn">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="categories-btn">Categories</a>
                <ul className="dropdown">
                  <li className="dropdown-item">
                    <Link to="">Cars</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="">Animals</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="">Doodles</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="">Landscapes</Link>
                  </li>
                  <li id="last-item" className="dropdown-item">
                    {" "}
                    <Link to="">Stick Figures</Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a>
                  <img
                    src="https://i.ibb.co/LRNwbDz/outline-shopping-cart-checkout-black-24dp.png"
                    alt="shopping-cart-checkout"
                  />
                </a>
              </li>

              <li className="nav-item">
                <a>
                  <img
                    src="https://i.ibb.co/4Zcr662/account-Logo.png"
                    alt="account-Logo"
                    id="account-logo"
                  />
                </a>
              </li>
              <li className="nav-item">
                <a href="#" onClick={handleClick}>
                  <img
                    src="https://i.ibb.co/2gfMsdL/logout.png"
                    alt="logout"
                    id="logout-icon"
                  />
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
