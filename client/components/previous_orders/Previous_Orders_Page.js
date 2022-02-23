import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./Previous_Orders_Page.css";

const Previous_Orders_Page = () => {
  const state = useSelector((state) => state);

  const userOrders = [];
  if (state.orders && state.orders.length > 0) {
    const id = state.auth.id;
    console.log("id", id);

    // console.log("order", state.orders);
    // const orders = state.orders.filter((order) => order.UserId === thisId);
    // console.log(orders);

    for (let i = 0; i < state.orders.length; i++) {
      if (state.orders[i].userId === id) {
        // if (state.orders.indexOf(i) === -1) {
        // console.log([i], st.orders[i]);

        userOrders.push(state.orders[i]);
      }
    }
  }

  //   if(this.items.indexOf(item) === -1) {
  //     this.items.push(item);
  //     console.log(this.items);
  // }

  // const userOrders = finder(state, id);
  // console.log(userOrders);
  console.log(userOrders);
  return (
    <div className="singleProduct">
      <h1>Previous Orders Page </h1>
      <div className="singleProducts">
        {userOrders.map((order) => {
          return (
            <ul key={order.id}>
              <ol>
                {order.totalItems} items for ${order.totalPrice}{" "}
                {/* {userOrders.products.map((product) => {
          return (
            <ul key={product.id}>
              <ol>{product.name} </ol>
            </ul>
          ); */}
              </ol>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Previous_Orders_Page;
// connect((state) => state
