import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/product_store";
import { Link } from "react-router-dom";

const SingleCategory_Page = () => {
  const { pathname } = useLocation();

  let category;

  switch (pathname) {
    case "/products/Cars":
      category = "Cars";
      break;
    case "/products/Kangaroos":
      category = "Kangaroos";
      break;
    case "/products/Doodles":
      category = "Doodles";
      break;
    case "/products/Landscapes":
      category = "Landscapes";
      break;
    case "/products/People":
      category = "People";
      break;
    case "/products/Apes":
      category = "Apes";
      break;
    case "/products/Punks":
      category = "Punks";
      break;
    default:
      break;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const products = useSelector((state) => state.products).filter(
    (product) => product.category === category
  );

  return (
    <div className="products-container">
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
