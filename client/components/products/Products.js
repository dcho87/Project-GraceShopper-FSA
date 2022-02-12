import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { Link } from "react-router-dom";

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
