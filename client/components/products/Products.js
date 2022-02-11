import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
<<<<<<< HEAD
import { fetchProducts, products } from "../../store/product_store";
// import { createOrder } from "../../store/";

const Products = () => {
  const dispatch = useDispatch();
=======
import { fetchProducts } from "../../store/product_store";
import { Link } from 'react-router-dom';

import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();

>>>>>>> 0a05fbd394bb8623f6c515b07ae674fc22ed0872
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const state = useSelector((state) => state);
  const userId = useSelector((state) => state.auth).id;

  // const addToCart = (product) => {
  //   const productToAdd = {
  //     userId,
  //     totalItems: 1,
  //     totalPrice: product.price,
  //   };

<<<<<<< HEAD
  //   dispatch(createOrder(productToAdd));
  // };

=======
>>>>>>> 0a05fbd394bb8623f6c515b07ae674fc22ed0872
  return (
    <div className="products-container">
      {state.products.map((product) => (
<<<<<<< HEAD
        <div key={product.id}>
          <h1>{product.name}</h1>
          <img src={product.imageURL} />
          <p>price: ${product.price}</p>
          <p>{product.inventory}</p>
          {/* <button onClick={() => addToCart(product)}>add item to cart</button> */}
=======

        
        
        <div className="product" key={product.name}>
                  {/* <h1>{product.name}</h1> */}
          <Link to={`/products/${product.id}`} > 
       <img className="product-img" src={product.imageURL} />
       </Link >

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
              <Link to={`/products/${product.category}`} > 
              {product.category}
       </Link >
          
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
>>>>>>> 0a05fbd394bb8623f6c515b07ae674fc22ed0872
        </div>
      ))}
    </div>
  );
};

export default Products;
