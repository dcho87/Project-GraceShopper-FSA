import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Previous_Orders_Page = () => {
  const state = useSelector((state) => state);
  const thisId = state.auth.id;
  // console.log(thisId);
  console.log(state.orders[0].userId);

  // if (!thisId) {
  //   return "Sorry the Campus you are looking for is unreachable";
  // }

  const orders = state.orders.filter((order) => order.UserId === thisId);
  // console.log(orders);
  // console.log(state.orders[0].userId);
  // let arry = [];
  // const finder = (st, otherId) => {
  //   for (let i = 0; i < st.orders.length; i++) {
  //     if (st.orders[i].userId === otherId) {
  //       arry += st.orders;
  //     }
  //     return arry;
  //   }
  // };
  // console.log(finder(state, thisId));

  // const userOrders = state.orders.forEach(
  //   (element) => (element.userId === thisId)

  //   }(arry += element.userId)
  // );
  // console.log(arry);

  // const found = array1.find((element) => element > 10);

  // const thisProductId = match.params.id;
  // const product = state.products.find(
  //   (product) => product.id === thisProductId
  // );

  return <h1>Previous Orders Page </h1>;
};

export default Previous_Orders_Page;
// connect((state) => state
