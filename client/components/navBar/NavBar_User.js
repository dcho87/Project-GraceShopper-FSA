import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrderDetails } from "../../store/index.js";

const Navbar_User = ({ handleClick, user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetails(user));
  }, []);

  const orderDetails = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

  return (
    <div className="header">
      <Link to="/home">
        <h1 id="logo">
          <img
            className="nft-logo"
            src="/NFT-Logo.jpg"
            // onClick={() => window.location.reload()}
          />
        </h1>
      </Link>

      <nav>
        <div className="nav-links">
          {/* The navbar will show these links after you log in */}
          <ul className="nav-list">
            {user.isAdmin === true ? (
              <li className="nav-item">
                <Link
                  to="/create-product"
                  className="nav-btn"
                  // onClick={() => window.location()}
                >
                  Add Product
                </Link>
              </li>
            ) : (
              ""
            )}
            <li className="nav-item">
              {" "}
              <Link to="/home" className="nav-btn nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-btn">Explore</a>
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
                  <Link className="dropdown-link" to="/products/RTFKTCLONEXTM">
                    RTFKTCLONEXTM
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
                      ? "cart-contents-count-0"
                      : "cart-contents-count"
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
            <li className="nav-item">
              <Link to="/bio">
                <img
                  src="https://i.ibb.co/YD9P9Zw/outline-account-circle-white-24dp.png"
                  alt="account-Logo"
                  id="account-logo"
                />
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" onClick={handleClick}>
                <img
                  src="https://i.ibb.co/XbkS6LJ/outline-logout-white-24dp.png"
                  alt="logout"
                  id="logout-icon"
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );

  // return (
  //   <div className="header">
  //     <Link to="/home">
  //       <h1 id="logo">
  //         <img className="nft-logo" src="/NFT-Logo.jpg" />
  //       </h1>
  //     </Link>
  //     {/* <Link to="/bio">
  //       {" "}
  //       <div> {user.first_name} logged in </div>
  //     </Link> */}
  //     <nav>
  //       <div className="nav-links">
  //         {/* The navbar will show these links after you log in */}
  //         <ul className="nav-list">
  //           {user.isAdmin === true ? (
  //             <li className="nav-item">
  //               <Link to="/products/create" className="nav-btn nav-link">
  //                 Add Product
  //               </Link>
  //             </li>
  //           ) : (
  //             ""
  //           )}
  //           <li className="nav-item">
  //             {" "}
  //             <Link to="/home">
  //               <p id="nav-btn nav-link">Home</p>
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <a className="nav-btn nav-link">Explore</a>
  //             <ul className="dropdown">
  //               <li className="dropdown-item">
  //                 <Link className="dropdown-link" to="/products/azuki">
  //                   Azuki
  //                 </Link>
  //               </li>
  //               <li className="dropdown-item">
  //                 <Link className="dropdown-link" to="/products/crypto_punks">
  //                   Crypto Punks
  //                 </Link>
  //               </li>
  //               <li className="dropdown-item">
  //                 <Link className="dropdown-link" to="/products/RTFKTCLONEXTM">
  //                   RTFKTCLONEXTM
  //                 </Link>
  //               </li>
  //               <li className="dropdown-item">
  //                 <Link className="dropdown-link" to="/products/Tasty_Bones">
  //                   Tasty Bones
  //                 </Link>
  //               </li>
  //               <li className="dropdown-item">
  //                 <Link className="dropdown-link" to="/products/The_Metascapes">
  //                   The Metascapes
  //                 </Link>
  //               </li>

  //               <li className="dropdown-item">
  //                 <Link className="dropdown-link" to="/products/The_Ladies">
  //                   The Ladies
  //                 </Link>
  //               </li>
  //             </ul>
  //           </li>
  //           <li className="nav-item">
  //             <Link to="/cart">
  //               <img
  //                 src="https://i.ibb.co/tQgMFFz/outline-add-shopping-cart-white-24dp.png"
  //                 alt="shopping-cart-checkout"
  //                 className="menu-item cart-contents"
  //               />
  //               <span
  //                 className={
  //                   !orderDetails ||
  //                   (orderDetails.totalItems > 0 && !orderDetails.products) ||
  //                   orderDetails.totalItems === 0
  //                     ? "cart-contents-count-0"
  //                     : "cart-contents-count"
  //                 }
  //               >
  //                 {!orderDetails ||
  //                 (orderDetails.totalItems > 0 && !orderDetails.products) ||
  //                 orderDetails.totalItems === 0
  //                   ? 0
  //                   : orderDetails.totalItems}
  //               </span>
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link to="/bio">
  //               <img
  //                 src="https://i.ibb.co/YD9P9Zw/outline-account-circle-white-24dp.png"
  //                 alt="account-Logo"
  //                 id="account-logo"
  //               />
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link to="/" onClick={handleClick}>
  //               <img
  //                 src="https://i.ibb.co/XbkS6LJ/outline-logout-white-24dp.png"
  //                 alt="logout"
  //                 id="logout-icon"
  //               />
  //             </Link>
  //           </li>
  //         </ul>
  //       </div>
  //     </nav>
  //   </div>
  // );
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatch)(Navbar_User);
