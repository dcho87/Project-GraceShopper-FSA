import axios from "axios";

const LOAD_PRODUCTS = "LOAD_PRODUCTS";
const EDIT_PRODUCT = "EDIT_PRODUCT";

const _loadProducts = (products) => {
  return { type: LOAD_PRODUCTS, products };
};

const _editProduct = (order, product) => {
  return { type: EDIT_PRODUCT, order, product };
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

export const editProduct = (order, product) => {
  return async (dispatch) => {
    product.inventory -= order.totalItems;
    product = (await axios.put(`/api/products/${product.id}`, product)).data;
    dispatch(_editProduct(order, product));
  };
};

export const products = (state = [], action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return action.products;
    case EDIT_PRODUCT:
      return state;

    default:
      return state;
  }
};
