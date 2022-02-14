import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Products.css";

const Products = () => {
  const state = useSelector((state) => state);

  return (
    <div className="products-container">
      {state.products.map((product) => (
        <div className="product" key={product.name}>
          <Link to={`/products/${product.id}`}>
            <img className="product-img" src={product.imageURL} />
          </Link>

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
              <Link to={`/products/${product.category}`}>
                {product.category}
              </Link>
            </p>
            <button>Add to cart</button>
            <input
              type="number"
              step="1"
              placeholder="1"
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
