import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "../../store/index.js";

export default function Navbar() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    isLoggedIn
      ? dispatch(fetchOrderDetails(user))
      : (window.onstorage = () => {
          orderDetails = JSON.parse(window.localStorage.getItem("cart"));
        });
  }, []);

  const isLoggedIn = !!user.id;

  const orderDetails = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

  return (
    <div className="header">
      <Link to="/home">
        <h1 id="logo">
          <img className="nft-logo" src="/NFT-Logo.jpg" />
        </h1>
      </Link>

      <nav>
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
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <img
                  src="https://i.ibb.co/tQgMFFz/outline-add-shopping-cart-white-24dp.png"
                  // src="https://i.ibb.co/LRNwbDz/outline-shopping-cart-checkout-black-24dp.png"
                  alt="shopping-cart-checkout"
                />
                <span
                  className={
                    !orderDetails ||
                    (orderDetails.totalItems > 0 && !orderDetails.products) ||
                    orderDetails.totalItems === 0
                      ? isLoggedIn
                        ? "cart-contents-count-0"
                        : "cart-contents-count-0-no-user"
                      : isLoggedIn
                      ? "cart-contents-count"
                      : "cart-contents-count-no-user"
                  }
                >
                  {!orderDetails ||
                  (orderDetails.totalItems > 0 && !orderDetails.products) ||
                  orderDetails.totalItems === 0
                    ? 0
                    : orderDetails.totalItems}
                </span>
              </Link>
            </li>
            {isLoggedIn ? (
              <div>
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
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={() => dispatch(logout())}
                  >
                    <img
                      src="https://i.ibb.co/XbkS6LJ/outline-logout-white-24dp.png"
                      alt="outline-add-shopping-cart-white-24dp"
                      // src="https://i.ibb.co/2gfMsdL/logout.png"
                      alt="logout"
                      id="logout-icon"
                    />
                  </Link>
                </li>
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
          </ul>
        </div>
      </nav>
    </div>
  );
}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     handleClick() {
//       dispatch(logout());
//     },
//   };
// };

// export default connect(mapState, mapDispatch)(Navbar);
