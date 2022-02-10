import axios from "axios";

const LOAD_PRODUCTS = "LOAD_PRODUCTS";

const _loadProducts = (products) => {
  return { type: LOAD_PRODUCTS, products };
};

export const products = (state = [], action) => {
  if (action.type === LOAD_PRODUCTS) {
    return action.products;
  }

  if (action.type === "UPDATE_PRODUCT") {
    return state.map(
      (product) => (product.id = action.product.id ? action.product : product)
    );
  }

  if (action.type === "DELETE_PRODUCT") {
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
    dispatch(_loadProducts(products));
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    const product_ = await axios.post(`/api/products`, {
      product,
    });
    dispatch({ type: "CREATE_PRODUCT", product_ });
  };
};

export const destroyProduct = (productId) => {
  return async (dispatch) => {
    const product_ = await axios.delete(`/api/products/${productId}`);
    dispatch({ type: "DELETE_PRODUCT", product_ });
  };
};

export const editProduct = (productId, product) => {
  return async (dispatch) => {
    const product_ = await axios.put(`/api/products/${productId}`, {
      product,
    });
    dispatch({ type: "UPDATE_PRODUCT", product_ });
  };
};
