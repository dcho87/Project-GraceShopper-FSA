import React from "react";
import { connect, useSelector } from "react-redux";
import "./Products.css";
import { Link, useParams } from "react-router-dom";

const Single_Product_Page = () => {
  const thisProductId = useParams();

  const products = useSelector((state) => state.products);

  return (
    <div>
      {products
        .filter((product) => product.id === thisProductId.id)
        .map((product) => (
          <div className="product" key={product.name}>
            <h1>{product.name}</h1>
            <img className="product-img-single" src={product.imageURL} />
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

export default connect((state) => state)(Single_Product_Page);
