import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product_store";

const SingleCategory_Page = () => {
  const { pathname } = useLocation();

  let category;

  const categories = {
    cars: "Car",
    animals: "Animal",
    doodles: "Doodle",
    landscapes: "Landscape",
    stick_figures: "Stick Figure",
    apes: "Ape",
    punks: "Punk",
  };

  Object.keys(categories).map((cat) => {
    if (pathname === `/products/${cat}`) category = categories[cat];
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.products).filter(
    (product) => product.category === category
  );

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <img src={product.imageURL} />
          <p>{product.price}</p>
          <p>{product.inventory}</p>
        </div>
      ))}
    </div>
  );
};

export default SingleCategory_Page;
