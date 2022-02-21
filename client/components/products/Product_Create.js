import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../store";

export default function Product_Create() {
  const [state, setstate] = useState({});

  const dispatch = useDispatch();
  console.log(state);
  return (
    <div>
      <form>
        <div style={{ backgroundColor: "#ffffff" }}>
          {" "}
          <div>
            <label>Image URL</label>
            <input
              onChange={(e) => setstate({ ...state, imageURL: e.target.value })}
              type="text"
            />
            <label>Top Bid: </label>
            <input
              onChange={(e) => setstate({ ...state, price: e.target.value })}
              type="number"
            />
          </div>
          <div>
            <label>Inventory: </label>
            <input
              onChange={(e) =>
                setstate({ ...state, inventory: e.target.value })
              }
              type="number"
            />
          </div>
          <div>
            <label>Name: </label>
            <input
              onChange={(e) => setstate({ ...state, name: e.target.value })}
              type="text"
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              onChange={(e) =>
                setstate({ ...state, description: e.target.value })
              }
              type="text"
            />
          </div>
          <div>
            <label>Category: </label>
            <input
              onChange={(e) => setstate({ ...state, category: e.target.value })}
              type="text"
            />
          </div>
          <div>
            <button
              onClick={() => {
                dispatch(createProduct(state));
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
