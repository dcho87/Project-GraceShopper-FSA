import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product_store";

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
              <b> Top Bid:</b> ${product.price}
            </p>
            <p>
              {" "}
              <b>Left in stock:</b> {product.inventory}
            </p>
            <p>
              <b>Category: </b>
              {product.category}
            </p>
            <button>Add to cart</button>
            <input
              type="number"
              step="1"
              placeholder="0"
              min="0"
              max={product.inventory}
            ></input>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
