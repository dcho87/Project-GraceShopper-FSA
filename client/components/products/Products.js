import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToOrder,
  destroyProduct,
  editProduct,
  fetchOrderDetails,
} from "../../store/index.js";
import { Link } from "react-router-dom";
import "./Products.css";
import Product_Edit from "./Product_Edit.js";

const Products = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const user = state.auth;

  useEffect(() => {
    dispatch(fetchOrderDetails(user));
  }, []);

  const orderDetails = useSelector((state) => state.orders).find(
    (order) => order.userId === user.id
  );

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

  return (
    <div className="products-container">
      {state.products.map((product) => (
        <div className="product" key={product.name}>
          <div className="img-div">
            <Link to={`/products/${product.id}`}>
              <img className="product-img" src={product.imageURL} />
            </Link>
          </div>

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

            {user.isAdmin === true ? (
              <div>
                {" "}
                <Link to={`/products/edit/${product.id}`}>
                  <button
                    onClick={() => {
                      setProductId(product.id);
                    }}
                  >
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => {
                    dispatch(destroyProduct(product.id));
                  }}
                >
                  Delete
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
