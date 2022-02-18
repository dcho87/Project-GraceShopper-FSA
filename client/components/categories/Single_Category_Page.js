import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToOrder, editProduct } from "../../store/index.js";
import { Link } from "react-router-dom";

const SingleCategory_Page = () => {
  const state = useSelector((state) => state);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const user = state.auth;

  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState("");

  const userOrderId = state.orders
    .filter((order) => order.userId === user.id)
    .map((order) => order.id)[0];

  const orderToAdd = {
    id: userOrderId,
    totalItems,
    totalPrice,
    productId,
  };

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

  const products = useSelector((state) => state.products).filter(
    (product) => product.category === category
  );

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product" key={product.name}>
          <h1>{product.name}</h1>
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
            <button
              disabled={product.id !== productId || totalItems === 0}
              onClick={(ev) => {
                dispatch(addToOrder(orderToAdd, user));
                dispatch(editProduct(orderToAdd, product));
                setProductId("");
              }}
            >
              Add to cart
            </button>
            <input
              type="number"
              step={1}
              placeholder={0}
              min={0}
              max={product.inventory}
              onChange={(ev) => {
                setTotalItems(ev.target.value * 1);
                setTotalPrice(ev.target.value * product.price);
                setProductId(product.id);
              }}
            ></input>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleCategory_Page;
