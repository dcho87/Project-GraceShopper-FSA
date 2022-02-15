import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails, deleteOrder } from "../../store/index.js";
import "./Cart.css";

const Cart = () => {
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

  console.log("orderDetails", orderDetails);

  return (
    <div className="cart-cont">
      <div className="header">
        <h1>Shopping Cart</h1>
        <Link to="/orders/previous_orders">View Previous Orders</Link>
      </div>

      {orderDetails.products.map((product) => (
        <div key={product.id} className="single-product-cont">
          <Link to={`/products/${product.id}`}>
            <img className="cart-image" src={product.imageURL}></img>
          </Link>

          <div className="order-info-cont">
            <Link to={`/products/${product.id}`}>
              NFT Description: {product.description}
            </Link>
            <div> ${product.price} per NFT</div>
            <div>{product.inventory} NFTs left in stock.</div>

            <div className="quantity-cont">
              <div>Order Quantity:</div>
              <input
                type="number"
                step={1}
                placeholder={product.orderproduct.itemCount}
                min={0}
                max={product.inventory}
              ></input>
              <button>Update Order Quantity</button>
              <button
                onClick={() => dispatch(deleteOrder(orderDetails, product))}
              >
                Delete NFT from Order
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="checkout-cont">
        <div className="total-cont">
          Subtotal ({orderDetails.totalItems} items): ${orderDetails.totalPrice}
        </div>
        <Link to="/orders/checkout" className="link-to-checkout-cont">
          Proceed to Checkout
        </Link>
      </div>

      <Link to="/home">Continue Shopping</Link>
    </div>
  );
};

export default Cart;
