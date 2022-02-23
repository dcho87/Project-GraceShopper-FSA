import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
  // console.log("check", state.orders[0].products);
  //   if(this.items.indexOf(item) === -1) {
  //     this.items.push(item);
  //     console.log(this.items);
  // }

  // const userOrders = finder(state, id);
  // console.log(userOrders);
  console.log("userOrders", userOrders);
  return (
    <div className="singleProduct">
      <h1>Previous Orders Page </h1>
      <div className="singleProducts">
        {userOrders.map((order) => {
          return (
            <ul key={order.id}>
              <ol>
                {order.totalItems} items for ${order.totalPrice} on {""}
                {order.createdAt.slice(0, -14)} at{" "}
                {order.createdAt.slice(11, -8)}{" "}
              </ol>
              <div>{console.log("products", order.products)}</div>
              {order.products.map((product) => {
                return (
                  <ul key={product.id}>
                    <ol>
                      ${product.price}:
                      <Link to={`/products/${product.id}`}>
                        {" "}
                        {product.name}{" "}
                      </Link>
                      in{" "}
                      <Link to={`/products/${product.category}`}>
                        {product.category}
                      </Link>
                    </ol>
                  </ul>
                );
              })}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Previous_Orders_Page;
// connect((state) => state
