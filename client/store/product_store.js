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

export const createUser = (product) => {
  return async (dispatch) => {
    const product_ = await axios.post(`/api/products`, {
      product,
    });
    dispatch({ type: "CREATE_PRODUCT", product_ });
  };
};

export const destroyUser = (productId) => {
  return async (dispatch) => {
    const product_ = await axios.delete(`/api/products/${productId}`);
    dispatch({ type: "DELETE_PRODUCT", product_ });
  };
};

export const editUser = (productId, product) => {
  return async (dispatch) => {
    const product_ = await axios.put(`/api/students/${productId}`, {
      product,
    });
    dispatch({ type: "UPDATE_PRODUCT", product_ });
  };
};
