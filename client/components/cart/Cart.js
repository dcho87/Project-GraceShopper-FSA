import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrderDetails,
  deleteOrder,
  updateOrder,
} from "../../store/index.js";
import "./Cart.css";
import Alert from "@mui/material/Alert";

const totalInv = {};

const Cart = () => {
  const state = useSelector((state) => state);
  const user = state.auth;

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState("joe");
  const [error, setError] = useState("");
  const [currentVal, setCurrentVal] = useState(0);
  // const [invLimit, setInvLimit] = useState(0);

  const userOrderId = state.orders
    .filter((order) => order.userId === user.id)
    .map((order) => order.id)[0];

  const orderToAdd = {
    id: userOrderId,
    totalItems,
    totalPrice,
    productId,
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrderDetails(user));
  }, []);

  let orderDetails = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart) {
    orderDetails = cart;
  }

  if (!orderDetails) {
    return null;
  }

  if (!orderDetails.products) {
    return null;
  }

  return (
    <div className="cart-cont-cart">
      <div className="header-cart">
        <h1>Shopping Cart</h1>
      </div>

      {orderDetails.products.map((product, idx) => {
        if (!totalInv.hasOwnProperty(product.id)) {
          totalInv[product.id] =
            product.orderproduct.itemCount + product.inventory;
        }

        // idx === orderDetails.products.length - 1 &&
        // console.log("totalInv", totalInv);

        return (
          <div key={product.id} className="single-product-cont-cart">
            <Link to={`/products/${product.id}`}>
              <img className="cart-image-cart" src={product.imageURL}></img>
            </Link>

            <div className="order-info-cont-cart">
              <Link to={`/products/${product.id}`}>
                NFT Description: {product.description}
              </Link>
              <div> ${product.price} per NFT</div>
              <div className="error-cont">
                {!!error && productId === product.id ? (
                  <Alert severity="error" className="error-text">
                    {error}
                  </Alert>
                ) : (
                  ""
                )}
              </div>
              <div className="quantity-cont-cart">
                <div>Order Quantity:</div>
                <input
                  type="number"
                  step={1}
                  defaultValue={product.orderproduct.itemCount}
                  min={0}
                  max={totalInv[product.id]}
                  onChange={(ev) => {
                    setTotalItems(ev.target.value * 1);
                    setTotalPrice(ev.target.value * product.price);
                    setProductId(product.id);
                    productId !== product.id && setError("");
                  }}
                  onClick={(ev) => {
                    productId !== product.id && setError("");
                    setProductId(product.id);
                    // setInvLimit(
                    //   product.orderproduct.itemCount + product.inventory
                    // );
                    ev.target.value * 1 === totalInv[product.id] &&
                    ev.target.value * 1 === currentVal
                      ? setError("Inventory Limit Has Been Reached")
                      : setError("");
                    setCurrentVal(ev.target.value * 1);

                    // console.log("totalItems - on inc/dec click", totalItems);

                    // console.log("totalPrice - on inc/dec click", totalPrice);

                    // console.log(
                    //   "orderDetails - on inc/dec click",
                    //   orderDetails
                    // );
                  }}
                ></input>
                <button
                  disabled={
                    productId === "joe" ||
                    product.id !== productId ||
                    totalItems === 0
                  }
                  onClick={() => {
                    // console.log(
                    //   "orderDetails - on update click, before thunk",
                    //   orderDetails
                    // );
                    dispatch(updateOrder(orderDetails, orderToAdd, product));
                    setProductId("Joe");
                    // console.log(
                    //   "orderDetails - on update click, after thunk",
                    //   orderDetails
                    // );
                    // console.log("orderToAdd - on update click", orderToAdd);

                    // console.log("totalItems - on update click", totalItems);

                    // console.log("totalPrice - on update click", totalPrice);
                  }}
                >
                  Update Order Quantity
                </button>
                <button
                  onClick={() => dispatch(deleteOrder(orderDetails, product))}
                >
                  Delete NFT from Order
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div className="checkout-cont-cart">
        {orderDetails.totalItems ? (
          <div>
            <div className="total-cont-cart">
              Subtotal ({orderDetails.totalItems}{" "}
              {orderDetails.totalItems === 1 ? "item" : "items"}): $
              {orderDetails.totalPrice}
            </div>
            <Link to="/orders/checkout" className="link-to-checkout-cont-cart">
              Proceed to Checkout
            </Link>
            <Link to="/home">Continue Shopping</Link>
          </div>
        ) : (
          <div>
            <h2>{user.first_name}, you have nothing in your cart.</h2>
            <Link to="/home">Shop now!</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
