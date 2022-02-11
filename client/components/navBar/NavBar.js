import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import "./Navbar.css";
import { useSelector } from "react-redux";

const Navbar = ({ handleClick, isLoggedIn }) => {
  const user = useSelector((state) => state.auth);

  return (
    <div className="header">
      <Link to="/home">
        <h1 id="logo">NFT</h1>
      </Link>
      {isLoggedIn && <h1>{user.first_name} is logged in</h1>}
      <nav>
        {isLoggedIn ? (
          <div className="nav-links">
            {/* The navbar will show these links after you log in */}
            <ul className="nav-list">
              <li className="nav-item">
                {" "}
                <Link to="/home">
                  <h5 id="home-btn">Home</h5>
                </Link>
              </li>
              <li className="nav-item">
                <a className="categories-btn">Categories</a>
                <ul className="dropdown">
                  <li className="dropdown-item">
                    <Link to="/products/cars">Cars</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/products/animals">Animals</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/products/doodles">Doodles</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/products/landscapes">Landscapes</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/products/stick_figures">Stick Figures</Link>
                  </li>
                  <li className="dropdown-item">
                    <Link to="/products/apes">Apes</Link>
                  </li>
                  <li id="last-item" className="dropdown-item">
                    <Link to="/products/punks">Punks</Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/cart">
                  <img
                    src="https://i.ibb.co/LRNwbDz/outline-shopping-cart-checkout-black-24dp.png"
                    alt="shopping-cart-checkout"
                  />
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/bio">
                  <img
                    src="https://i.ibb.co/4Zcr662/account-Logo.png"
                    alt="account-Logo"
                    id="account-logo"
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" onClick={handleClick}>
                  <img
                    src="https://i.ibb.co/2gfMsdL/logout.png"
                    alt="logout"
                    id="logout-icon"
                  />
                </Link>
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
