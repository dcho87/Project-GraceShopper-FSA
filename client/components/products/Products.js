import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToOrder, destroyProduct, editProduct } from "../../store/index.js";
import { Link, useLocation } from "react-router-dom";
import "./Products.css";
import Product_Edit from "./Product_Edit.js";
import Pagination from "./Pagination.js";
import { popoverClasses } from "@mui/material";

const Products = () => {
  const path = useLocation().pathname.split("/").pop();

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const user = state.auth;
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productId, setProductId] = useState("");
  const [show, setShow] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const userOrderId = state.orders
    .filter((order) => order.userId === user.id)
    .map((order) => order.id)[0];

  const orderToAdd = {
    id: userOrderId,
    totalItems,
    totalPrice,
    productId,
  };

  const EditForm = ({ id }) => {
    return <Product_Edit id={id} disableEditForm={(res) => setShow(res)} />;
  };

  const SortArrayDate = (a, b) => {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  };

  const SortArrayName = (x, y) => {
    if (x.name < y.name) {
      return -1;
    }
    if (x.name > y.name) {
      return 1;
    }
    return 0;
  };

  const SortArrayPrice = (x, y) => {
    if (x.price < y.price) {
      return -1;
    }
    if (x.price > y.price) {
      return 1;
    }
    return 0;
  };
  console.log(path);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexofFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts =
    path === "a-z"
      ? state.products
          .sort(SortArrayName)
          .slice(indexofFirstProduct, indexOfLastProduct)
      : path === "price"
      ? state.products
          .sort(SortArrayPrice)
          .slice(indexofFirstProduct, indexOfLastProduct)
      : state.products
          .sort(SortArrayDate)
          .slice(indexofFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products-container">
      <div>{show === "show" && <EditForm id={productId} />}</div>

      <div className="sorting-container">
        <ul>
          <li>
            <Link to="/products/sorted/a-z">Sort by A-Z</Link>
          </li>
          <li>
            <Link to="/products/sorted/price">Sort by Price</Link>
          </li>
        </ul>
      </div>
      {currentProducts.map((product) => (
        <div className="product" key={product.name}>
          <Link to={`/products/${product.id}`}>
            <div
              className=""
              style={{
                backgroundImage: `url(${product.imageURL}) `,
                width: "360px",
                height: "360px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
              }}
            >
              {/* <img className="product-img" src={product.imageURL} /> */}
            </div>
          </Link>

          <div className="product-details">
            <div className="other-details right">
              <p>
                <Link to={`/products/${product.category}`}>
                  {product.category}
                </Link>
              </p>
              <p style={{ fontSize: "1.4rem", fontWeight: "900" }}>
                {product.name}
              </p>

              {/* <p>
                <b>Sold so far</b>
                <p>{product.inventory}</p>
              </p> */}

              <button
                disabled={product.id !== productId || totalItems === 0}
                onClick={(ev) => {
                  dispatch(addToOrder(orderToAdd, user, product));
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
                <div className="edit-delte-btns">
                  {" "}
                  {/* <Link to={`/products/edit/${product.id}`}> */}
                  <button
                    onClick={() => {
                      setProductId(product.id);
                      setShow("show");
                      document.body.style.overflow = "hidden";
                    }}
                  >
                    Edit
                  </button>
                  {/* </Link> */}
                  <button onClick={() => dispatch(destroyProduct(product.id))}>
                    Delete
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="price-div right">
              <p style={{ fontSize: "0.8rem", margin: "0" }}>Buy Now</p>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "900",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "1rem", marginRight: "2px" }}>$</span>
                {product.price}
              </p>
            </div>
          </div>
        </div>
      ))}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={state.products.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Products;
