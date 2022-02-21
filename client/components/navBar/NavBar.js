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
      <Link className="nav-link" to="/">
        <h1 id="logo">NFT </h1>
      </Link>

      {/* {isLoggedIn &&  */}
      {/* // ( //{" "}
      <Link to="/bio">
        // // <div> {user.first_name} logged in </div>
        //{" "}
      </Link>
      // )} */}
      <nav>
        {isLoggedIn ? (
          <div className="nav-links">
            {/* The navbar will show these links after you log in */}
            <ul className="nav-list">
              {user.isAdmin === true ? (
                <li className="nav-item">
                  <Link to="/product/create" className="nav-btn nav-link">
                    Add Product
                  </Link>
                </li>
              ) : (
                ""
              )}
              <li className="nav-item">
                {" "}
                <Link className="nav-link" to="/home">
                  <p id="nav-btn">Home</p>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-btn nav-link">Explore</a>
                <ul className="dropdown">
                  <li className="dropdown-item">
                    <Link className="dropdown-link" to="/products/azuki">
                      Azuki
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link className="dropdown-link" to="/products/crypto_punks">
                      Crypto Punks
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link
                      className="dropdown-link"
                      to="/products/RTFKTCLONEXTM"
                    >
                      RTFKTCLONEXTM
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link className="dropdown-link" to="/products/Tasty_Bones">
                      Tasty Bones
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link
                      className="dropdown-link"
                      to="/products/The_Metascapes"
                    >
                      The Metascapes
                    </Link>
                  </li>

                  <li className="dropdown-item">
                    <Link className="dropdown-link" to="/products/The_Ladies">
                      The Ladies
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  <img
                    src="https://i.ibb.co/tQgMFFz/outline-add-shopping-cart-white-24dp.png"
                    // src="https://i.ibb.co/LRNwbDz/outline-shopping-cart-checkout-black-24dp.png"
                    alt="shopping-cart-checkout"
                  />
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/bio">
                  <img
                    src="https://i.ibb.co/YD9P9Zw/outline-account-circle-white-24dp.png"
                    // src="https://i.ibb.co/4Zcr662/account-Logo.png"
                    alt="account-Logo"
                    id="account-logo"
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleClick}>
                  <img
                    src="https://i.ibb.co/XbkS6LJ/outline-logout-white-24dp.png"
                    alt="outline-add-shopping-cart-white-24dp"
                    // src="https://i.ibb.co/2gfMsdL/logout.png"
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
            <Link className="nav-link" to="/login">
              Sign in
            </Link>
            <Link className="nav-link" to="/signup">
              Sign Up
            </Link>
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
