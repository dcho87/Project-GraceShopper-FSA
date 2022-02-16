import axios from "axios";

const LOAD_PRODUCTS = "LOAD_PRODUCTS";
const EDIT_PRODUCT = "EDIT_PRODUCT";
const DELETE_ORDER = "DELETE_ORDER";
const UPDATE_ORDER = "UPDATE_ORDER";

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
    case DELETE_ORDER:
      return [...state].map((product) => {
        if (product.id === action.order.productId) {
          const amountToAddToInv = action.order.products.find(
            (product) => product.id
          ).orderproduct.itemCount;
          product.inventory += amountToAddToInv;
          return product;
        }
        return product;
      });
    case UPDATE_ORDER:
      return [...state].map((product) => {
        console.log("action order", action.order);
        if (product.id === action.order.productId) {
          const inventoryIncrease =
            action.order.inventoryCountOG < action.order.orderUpdateTotalItems
              ? true
              : false;

          const difference =
            action.order.orderUpdateTotalItems - action.order.inventoryCountOG;

          // product.inventory -= difference;

          return product;
        }
        return product;
      });

    default:
      return state;
  }
};
