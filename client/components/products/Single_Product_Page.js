import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { connect } from "react-redux";
import "./Products.css";
import { Link } from "react-router-dom";

const Single_Product_Page = ({ products, match }) => {
  const thisProductId = match.params.id;
  const product = products.find((product) => product.id === thisProductId);
  // if(!product){
  //   return 'Sorry the product you are looking for is unreachable';
  //       }
  console.log(product.name);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <>
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
    </>
  );
};

export default connect((state) => state)(Single_Product_Page);
