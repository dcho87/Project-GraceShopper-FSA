import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editProduct } from "../../store";

export default function Product_Create_Edit() {
  const productId = useParams().id;
  const products = useSelector((state) => state.products);
  const product = products.filter((product) => product.id === productId);
  const [state, setstate] = useState({
    ...product,
  });

  const dispatch = useDispatch();
  return (
    <form>
      {product.map((product) => (
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
            <button onClick={() => dispatch(editProduct(productId, state))}>
              Submit Changes
            </button>
          </div>
        </div>
      ))}
    </form>
  );
}
