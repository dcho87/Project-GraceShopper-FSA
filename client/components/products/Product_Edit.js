import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { editProduct } from "../../store";

export default function Product_Edit({ id }) {
  const productId = useParams().id;
  // let productId = id;

  const products = useSelector((state) => state.products);
  const product = products.filter((product) => product.id === productId)[0];

  const [state, setstate] = useState({
    id: productId,
    ...product,
  });
  console.log(productId);

  const dispatch = useDispatch();
  return (
    <div>
      <form>
        <div>
          {" "}
          <div>
            <label>Top Bid: </label>
            <input
              defaultValue={product.price}
              onChange={(e) => setstate({ ...state, price: e.target.value })}
              type="number"
            />
          </div>
          <div>
            <label>Inventory: </label>
            <input
              defaultValue={product.inventory}
              onChange={(e) =>
                setstate({ ...state, inventory: e.target.value })
              }
              type="number"
            />
          </div>
          <div>
            <label>Name: </label>
            <input
              defaultValue={product.name}
              onChange={(e) => setstate({ ...state, name: e.target.value })}
              type="text"
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              defaultValue={product.description}
              onChange={(e) =>
                setstate({ ...state, description: e.target.value })
              }
              type="text"
            />
          </div>
          <div>
            <label>Category: </label>
            <input
              defaultValue={product.category}
              onChange={(e) => setstate({ ...state, category: e.target.value })}
              type="text"
            />
          </div>
          <div>
            <button
              onClick={() => {
                dispatch(editProduct({}, state));
              }}
            >
              Submit Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
