import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, products } from "../../store/product_store";

import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const state = useSelector((state) => state);

  return (
    <div className="products-container">
      {state.products.map((product) => (
        <div className="product" key={product.name}>
          <img className="product-img" src={product.imageURL} />
          <div className="product-details">
            <p>
              <b> Top Bid:</b> {product.price}$
            </p>
            <p>
              {" "}
              <b>Total Count:</b> {product.inventory}
            </p>
            <p>
              <b>Category: </b>
              {product.category}
            </p>
            <button>Add to cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
