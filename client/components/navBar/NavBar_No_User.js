import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "../../store/index.js";

const Navbar_No_User = () => {
  // const dispatch = useDispatch();

  let orderDetails = JSON.parse(localStorage.getItem("cart"));

  useEffect(() => {
    window.onstorage = () => {
      orderDetails = JSON.parse(window.localStorage.getItem("cart"));
    };
  }, []);

  return (
    <div className="header">
      <Link to="/home">
        <h1 id="logo">
          <img className="nft-logo" src="/NFT-Logo.jpg" />
        </h1>
      </Link>
      <nav>
        <div className="nav-links">
          <ul className="nav-list">
            <li className="nav-item">
              {" "}
              <Link to="/home">
                <p id="nav-btn nav-link">Home</p>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-btn nav-link">Explore</a>
              <ul className="dropdown">
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/Azuki">
                    Azuki
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/Crypto_Punks">
                    Crypto Punks
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/Clone_X">
                    Clone X
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/Tasty_Bones">
                    Tasty Bones
                  </Link>
                </li>
                <li className="dropdown-item">
                  <Link className="dropdown-link" to="/products/The_Metascapes">
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
              <Link to="/cart">
                <img
                  src="https://i.ibb.co/tQgMFFz/outline-add-shopping-cart-white-24dp.png"
                  alt="shopping-cart-checkout"
                  className="menu-item cart-contents"
                />
                <span
                  className={
                    !orderDetails ||
                    (orderDetails.totalItems > 0 && !orderDetails.products) ||
                    orderDetails.totalItems === 0
                      ? "cart-contents-count-0-no-user"
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
            <li className="nav-item nav-link">
              <Link to="/login">Sign in</Link>
            </li>

            <li className="nav-item nav-link">
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default connect(null)(Navbar_No_User);
