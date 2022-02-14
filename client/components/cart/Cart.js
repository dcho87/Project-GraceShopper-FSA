import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../store/index.js";
import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const user = useSelector((state) => state.auth);

  const userOrder = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

  console.log("userOrder:", userOrder);

  return (
    <div>
      Your Current Cart contains:
      <h4> I think we just map over each item, </h4>
      <h4> each map contains </h4>{" "}
      <ul>
        <li> Name (links to product) </li>
        <li> Picture (also links to product?) </li>
        <li> Price </li>
        <li> Quantity in cart (can increment)</li>
        <li> Delete button </li>

        <button>
          <Link to="/home">Continue Shopping</Link>
        </button>
      </ul>
    </div>
  );
};

export default Cart;
