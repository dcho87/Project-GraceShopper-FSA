import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProduct } from "../../store";

export default function Product_Create() {
  const [state, setstate] = useState({});

  const dispatch = useDispatch();
  return (
    <div>
      <form>
        <div>
          {" "}
          <div>
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
