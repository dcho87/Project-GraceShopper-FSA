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

const Cart = () => {
  const state = useSelector((state) => state);
  const user = state.auth;

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState("joe");
  const [error, setError] = useState("");
  const [currentVal, setCurrentVal] = useState(0);
  const [invLimit, setInvLimit] = useState(0);

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

  const orderDetails = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

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
                  max={product.orderproduct.itemCount + product.inventory}
                  onChange={(ev) => {
                    setTotalItems(ev.target.value * 1);
                    setTotalPrice(ev.target.value * product.price);
                    setProductId(product.id);
                    productId !== product.id && setError("");
                  }}
                  onClick={(ev) => {
                    productId !== product.id && setError("");
                    setProductId(product.id);
                    setInvLimit(
                      product.orderproduct.itemCount + product.inventory
                    );
                    ev.target.value * 1 === invLimit &&
                    ev.target.value * 1 === currentVal
                      ? setError("Inventory Limit Has Been Reached")
                      : setError("");
                    setCurrentVal(ev.target.value * 1);
                  }}
                ></input>
                <button
                  disabled={
                    productId === "joe" ||
                    product.id !== productId ||
                    totalItems === 0
                  }
                  onClick={() =>
                    dispatch(updateOrder(orderDetails, orderToAdd, product))
                  }
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
