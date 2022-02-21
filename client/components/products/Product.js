// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { fetchProducts } from "../../store/product_store";
// import { connect } from "react-redux";
// import "./Products.css";
// import { Link, useParams } from "react-router-dom";

// const Product = () => {
//   const thisProductId = useParams();
//   console.log(thisProductId);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, []);

//   const product = useSelector((state) =>
//     state.products.find((product) => product.id === thisProductId)
//   );

//   console.log(product.name);

//   return (
//     <div className="product" key={product.name}>
//       <h1>{product.name}</h1>
//       <img className="product-img" src={product.imageURL} />
//       <div className="product-details">
//         <small>{product.description}</small>&nbsp;
//         <p>
//           <b> Top Bid:</b> ${product.price}
//         </p>
//         <p>
//           {" "}
//           <b>Left in stock:</b> {product.inventory}
//         </p>
//         <p>
//           <b>Category: </b>
//           <Link to={`/products/${product.category}`}>{product.category}</Link>
//         </p>
//         <button>Add to cart</button>
//         <input
//           type="number"
//           step="1"
//           placeholder="0"
//           min="0"
//           max={product.inventory}
//         ></input>
//       </div>
//     </div>
//   );
// };

// export default connect((state) => state)(Product);

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToOrder, editProduct } from "../../store/index.js";
import "./Products.css";
import { Link, useParams } from "react-router-dom";

export default function Product() {
  const state = useSelector((state) => state);
  const thisProductId = useParams().id;
  const product = state.products.filter(
    (product) => product.id === thisProductId
  );

  console.log(product);

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
  return (
    <div className="product">
      {product.map((product) => (
        <div>
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
              <Link to={`/products/${product.category}`}>
                {product.category}
              </Link>
            </p>
            <button
              disabled={product.id !== productId || totalItems === 0}
              onClick={(ev) => {
                dispatch(addToOrder(orderToAdd));
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
}
