import React, { useEffect, useReducer, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, products } from "../../store/product_store";

const Products = () => {
  const dispatch = useDispatch();

  //   const [state_, setstate] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const state = useSelector((state) => state);

  console.log(state.pictureURL);

  return (
    <div>
      {state.products.map((product) => (
        <div>
          <h1>{product.name}</h1>
          <img src={product.imageURL} max-width='100%' height='150' />
          <p>${product.price}</p>
          <p>{product.inventory} left in stock</p>
          <button>Add to cart</button>
          <input type='number'  step='1' placeholder="0" min='0' max={product.inventory} ></input>
     
 
        </div>
      ))}
    </div>
  );
};

export default Products;
