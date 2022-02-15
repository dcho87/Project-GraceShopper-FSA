import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../../store/index.js";
import "./Checkout.css";

const Checkout = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetails(user));
  }, []);

  const orderDetails = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

  if (!orderDetails) {
    return null;
  }

  if (!orderDetails.products) {
    return null;
  }
  console.log(user);
  console.log("orderDetails", orderDetails);
  console.log(orderDetails.totalItems);
  return (
    <div>
      {/* <nav> */}
      {/* {isLoggedIn ? ( */}
      {/* <div className="nav-links"> */}
      {/* The navbar will show these links after you log in */}
      {/* </div> */}
      {/* ) : ( */}
      {/* <div> */}
      {/* The navbar will show these links before you log in */}
      {/* )} */}
      {/* </nav> */}
      {!!orderDetails.totalItems ? (
        <div className="cart-cont">
          <div className="header">
            <h1>Checkout</h1>
            <Link to="/orders/previous_orders">View Previous Orders</Link>
          </div>
          {orderDetails.products.map((product) => (
            <div key={product.id} className="single-product-cont">
              <Link to={`/products/${product.id}`}>
                <img className="cart-image" src={product.imageURL}></img>
              </Link>
              <div className="order-info-cont">
                <Link to={`/products/${product.id}`}>
                  <h3>{product.name}</h3>
                  <h4>
                    {product.orderproduct.itemCount} x {product.price}{" "}
                  </h4>
                  <h3>${product.price * product.orderproduct.itemCount}</h3>
                </Link>
              </div>
            </div>
          ))}

          <div className="checkout-cont">
            <div className="total-cont">
              Subtotal ({orderDetails.totalItems} items): $
              {orderDetails.totalPrice} <br />
              Shipping : Free <br />
              Estimated Tax: $
              {Math.round(orderDetails.totalPrice * 0.07).toFixed(2)}
            </div>
            <h3 className="total-cont">
              Order Total: $
              {Math.round(orderDetails.totalPrice * 1.07).toFixed(2)}
            </h3>
            <button>Place Order</button>
          </div>
          <Link to="/cart">Back To Cart</Link>
        </div>
      ) : (
        <div>
          <div className="cart-cont">
            <div className="header">
              <h1>Shopping Cart</h1>
              <Link to="/orders/previous_orders">View Previous Orders</Link>
            </div>
          </div>

          <h2>
            {user.first_name}, you have nothing in your cart. Click
            <Link to="/home"> here to</Link> add products
          </h2>
          <Link to="/home">Continue Shopping</Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
