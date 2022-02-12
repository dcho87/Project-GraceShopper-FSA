import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { Link } from "react-router-dom";

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
        <div className="product" key={product.name}>
          {/* <h1>{product.name}</h1> */}
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

export default SingleCategory_Page;
