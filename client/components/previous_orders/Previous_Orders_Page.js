import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Previous_Orders_Page = () => {
  const state = useSelector((state) => state);
  if (state.orders && state.orders.length > 0) {
    const id = state.auth.id;
    console.log("id", id);

    console.log("order", state.orders);
    // const orders = state.orders.filter((order) => order.UserId === thisId);
    // console.log(orders);

    //   const finder = (st, otherId) => {
    //     const arry = [];
    //     for (let i = 0; i < st.orders.length; i++) {
    //       if (st.orders[i].userId === otherId) {
    //         console.log([i], st.orders[i]);
    //       }
    //     }
    //   };
    //   console.log(finder(state, id));
  }

  return <h1>Previous Orders Page </h1>;
};

export default Previous_Orders_Page;
// connect((state) => state
