import axios from "axios";

const ADD_TO_ORDER = "ADD_TO_ORDER";

const _addToOrder = (product) => {
  return { type: ADD_TO_ORDER, product };
};

export const addToOrder = (product) => {
  return async (dispatch) => {
    dispatch(_addToOrder(product));
  };
};

// export const fetchProducts = () => {
//   return async (dispatch) => {
//     const products = (await axios.get("/api/products")).data;
//     dispatch(_loadProducts(products));
//   };
// };

// export const orders = (state = [], action) => {
//   switch (action.type) {
//     case CREATE_ORDER:
//       return [...state, action.order];
//     default:
//       return state;
//   }
// };
