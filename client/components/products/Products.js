import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, products } from "../../store/product_store";
// import { createOrder } from "../../store/";

const Products = () => {
  const dispatch = useDispatch();
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

  //   dispatch(createOrder(productToAdd));
  // };

  return (
    <div className="products-container">
      {state.products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <img src={product.imageURL} />
          <p>price: ${product.price}</p>
          <p>{product.inventory}</p>
          {/* <button onClick={() => addToCart(product)}>add item to cart</button> */}
        </div>
      ))}
    </div>
  );
};

export default Products;
