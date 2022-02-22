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
                <p id="nav-btn">Home</p>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-btn">Explore</a>
              <ul className="dropdown">
                <li className="dropdown-item">
                  <Link to="/products/Cars">Cars</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/products/Kangaroos">Kangaroos</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/products/Doodles">Doodles</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/products/Landscapes">Landscapes</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/products/People">People</Link>
                </li>
                <li className="dropdown-item">
                  <Link to="/products/Apes">Apes</Link>
                </li>
                <li id="last-item" className="dropdown-item">
                  <Link to="/products/Punks">Punks</Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/cart">
                <img
                  src="https://i.ibb.co/LRNwbDz/outline-shopping-cart-checkout-black-24dp.png"
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
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>

            <li className="nav-item">
              <Link to="/signup">Sign Up</Link>
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

  //     {isLoggedIn && (
  //       <Link to="/bio">
  //         {" "}
  //         <div> {user.first_name} logged in </div>
  //       </Link>
  //     )}
  //     <nav>
  //       {isLoggedIn ? (
  //         <div className="nav-links">
  //           {/* The navbar will show these links after you log in */}
  //           <ul className="nav-list">
  //             {user.isAdmin === true ? (
  //               <li className="nav-item">
  //                 <Link to="/products/create" className="nav-btn">
  //                   Add Product
  //                 </Link>
  //               </li>
  //             ) : (
  //               ""
  //             )}
  //             <li className="nav-item">
  //               {" "}
  //               <Link to="/home">
  //                 <p id="nav-btn">Home</p>
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <a className="nav-btn">Explore</a>
  //               <ul className="dropdown">
  //                 <li className="dropdown-item">
  //                   <Link to="/products/Cars">Cars</Link>
  //                 </li>
  //                 <li className="dropdown-item">
  //                   <Link to="/products/Kangaroos">Kangaroos</Link>
  //                 </li>
  //                 <li className="dropdown-item">
  //                   <Link to="/products/Doodles">Doodles</Link>
  //                 </li>
  //                 <li className="dropdown-item">
  //                   <Link to="/products/Landscapes">Landscapes</Link>
  //                 </li>
  //                 <li className="dropdown-item">
  //                   <Link to="/products/People">People</Link>
  //                 </li>
  //                 <li className="dropdown-item">
  //                   <Link to="/products/Apes">Apes</Link>
  //                 </li>
  //                 <li id="last-item" className="dropdown-item">
  //                   <Link to="/products/Punks">Punks</Link>
  //                 </li>
  //               </ul>
  //             </li>
  //             <li className="nav-item">
  //               <Link to="/cart">
  //                 <img
  //                   src="https://i.ibb.co/LRNwbDz/outline-shopping-cart-checkout-black-24dp.png"
  //                   alt="shopping-cart-checkout"
  //                   className="menu-item cart-contents"
  //                 />
  //                 <span
  //                   className={
  //                     !orderDetails ||
  //                     (orderDetails.totalItems > 0 && !orderDetails.products) ||
  //                     orderDetails.totalItems === 0
  //                       ? "cart-contents-count-0"
  //                       : "cart-contents-count"
  //                   }
  //                 >
  //                   {!orderDetails ||
  //                   (orderDetails.totalItems > 0 && !orderDetails.products) ||
  //                   orderDetails.totalItems === 0
  //                     ? 0
  //                     : orderDetails.products.length}
  //                 </span>
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link to="/bio">
  //                 <img
  //                   src="https://i.ibb.co/4Zcr662/account-Logo.png"
  //                   alt="account-Logo"
  //                   id="account-logo"
  //                 />
  //               </Link>
  //             </li>
  //             <li className="nav-item">
  //               <Link to="/login" onClick={handleClick}>
  //                 <img
  //                   src="https://i.ibb.co/2gfMsdL/logout.png"
  //                   alt="logout"
  //                   id="logout-icon"
  //                 />
  //               </Link>
  //             </li>
  //           </ul>
  //         </div>
  //       ) : (
  //         <div>
  //           {/* The navbar will show these links before you log in */}
  //           <Link to="/cart">
  //             <img
  //               src="https://i.ibb.co/LRNwbDz/outline-shopping-cart-checkout-black-24dp.png"
  //               alt="shopping-cart-checkout"
  //               className="menu-item cart-contents"
  //             />
  //           </Link>
  //           <Link to="/login">Login</Link>
  //           <Link to="/signup">Sign Up</Link>
  //         </div>
  //       )}
  //     </nav>
  //   </div>
  // );
};

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

export default connect(null)(Navbar_No_User);
