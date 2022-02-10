import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, products } from "../../store/product_store";
import axios from "axios";

const SingleProduct = () => {
  const dispatch = useDispatch();

  //   const [state_, setstate] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const state = useSelector((state) => state);

  console.log(state);

  return <div>{JSON.stringify(state.products)}</div>;
};

export default SingleProduct;
