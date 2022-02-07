import axios from "axios";

export const products = (state = [], action) => {
  if (action.type === "LOAD_PRODUCTS") {
    return action.products;
  }

  if (action.type === "UPDATE_PRODUCT") {
    return state.map(
      (product) => (product.id = action.product.id ? action.product : product)
    );
  }

  if (action.type === "DELETE_PRODUCT") {
    console.log(state);
    return state.filter((product) => product.id !== action.product.id);
  }

  if (action.type === "CREATE_PRODUCT") {
    return [...state, action.products];
  }

  return state;
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const products = (await axios.get("/api/products")).data;
    dispatch({
      type: "LOAD_PRODUCTS",
      products,
    });
  };
};