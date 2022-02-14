import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { connect } from "react-redux";
import "./Products.css";
import { Link, useParams } from "react-router-dom";

const Product = () => {
  const thisProductId = useParams();
  console.log(thisProductId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const product = useSelector((state) =>
    state.products.find((product) => product.id === thisProductId)
  );

  console.log(product.name);

  return (
    <div className="product" key={product.name}>
      <h1>{product.name}</h1>
      <img className="product-img" src={product.imageURL} />
      <div className="product-details">
        <small>{product.description}</small>&nbsp;
        <p>
          <b> Top Bid:</b> ${product.price}
        </p>
        <p>
          {" "}
          <b>Left in stock:</b> {product.inventory}
        </p>
        <p>
          <b>Category: </b>
          <Link to={`/products/${product.category}`}>{product.category}</Link>
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
  );
};

export default connect((state) => state)(Product);
