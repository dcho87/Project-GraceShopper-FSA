import axios from "axios";
import { Provider } from "react-redux";

const LOAD_ORDERS = "LOAD_ORDERS";
const ADD_TO_ORDER = "ADD_TO_ORDER";
const LOAD_ORDER_DETAILS = "LOAD_ORDER_DETAILS";
const UPDATE_ORDER = "UPDATE_ORDER";
const DELETE_ORDER = "DELETE_ORDER";

const _loadOrders = (orders) => {
  return { type: LOAD_ORDERS, orders };
};

const _addToOrder = (order) => {
  return { type: ADD_TO_ORDER, order };
};

const _deleteOrder = (order) => {
  return { type: DELETE_ORDER, order };
};

const _updateOrder = (order) => {
  return { type: UPDATE_ORDER, order };
};

const _loadOrderDetails = (orderDetails) => {
  return { type: LOAD_ORDER_DETAILS, orderDetails };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    const orders = (await axios.get("/api/orders")).data;
    dispatch(_loadOrders(orders));
  };
};

export const addToOrder = (order) => {
  return async (dispatch) => {
    if (order.id) {
      order.type = "add";
      order = (await axios.put(`/api/orders/${order.id}`, order)).data;
      dispatch(_addToOrder(order));
    } else {
      //for guest users
      let cart = JSON.parse(localStorage.getItem("cart"));
      if (cart) {
        //check if product is already exist
        const productIdx = cart.products.findIndex(
          (p) => p.productId === order.productId
        );
        const productToAdd = cart.products[productIdx];
        //create association if new, otherwise add to quantity
        if (productIdx === -1) {
          order.OrderProducts = { itemCount: order.totalItems };
          cart.products.push(order);
        } else {
          productToAdd.OrderProducts.itemCount += order.totalItems;
        }
        cart.totalPrice += order.totalPrice;
        cart.totalItems += order.totalItems;
      } else {
        cart = { products: [], totalPrice: 0, totalItems: 0 };
        order.OrderProducts = { itemCount: order.totalItems };
        cart.products.push(order);
        cart.totalPrice = order.totalPrice;
        cart.totalItems = order.totalItems;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(_addToOrder(cart));
    }
  };
};

export const updateOrder = (order, orderUpdates, product) => {
  return async (dispatch) => {
    if (order.id) {
      order.type = "update";
      order.productId = product.id;
      order.orderToUpdateId = orderUpdates.id;
      order.orderUpdateTotalItems = orderUpdates.totalItems;
      order.orderUpdateTotalPrice = orderUpdates.totalPrice;
      console.log("thunk, order before axios call", order);
      order = (await axios.put(`/api/orders/${order.id}`, order)).data;
      console.log("thunk, order after axios call", order);
      dispatch(_updateOrder(order));
    } else {
      //for guest user's cart update
      let cart = JSON.parse(localStorage.getItem("cart"));
      //find the product to update
      const productIdx = cart.products.findIndex(
        (p) => p.productId === product.id
      );
      const productToUpdate = cart.products[productIdx];

      //find the difference between previous itemCount and the new itemCount
      const prevCount = Number(productToUpdate.OrderProducts.itemCount);
      const diff = orderUpdates.totalItems - prevCount;

      productToUpdate.OrderProducts.itemCount = orderUpdates.totalItems;
      cart.totalPrice += diff * product.price;
      cart.totalItems += diff;

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(_updateOrder(cart));
    }
  };
};

export const deleteOrder = (order, product) => {
  return async (dispatch) => {
    order.type = "delete";
    order.productId = product.id;
    order = (await axios.put(`/api/orders/${order.id}`, order)).data;
    dispatch(_deleteOrder(order));
  };
};

export const fetchOrderDetails = (user) => {
  return async (dispatch) => {
    if (user.id) {
      const orderDetails = (await axios.get(`/api/users/order/${user.id}`))
        .data;
      dispatch(_loadOrderDetails(orderDetails));
    } else {
      //for guest user
      let cart = JSON.parse(localStorage.getItem("cart"));
      dispatch(_loadOrderDetails(cart));
    }
  };
};

export const orders = (state = [], action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return action.orders;
    case LOAD_ORDER_DETAILS:
      return [...state].map((order) =>
        order.userId === action.orderDetails.userId
          ? action.orderDetails
          : order
      );
    case DELETE_ORDER:
      return [...state].map((order) => {
        if (order.id === action.order.id) {
          order.totalItems = action.order.totalItems;
          order.totalPrice = action.order.totalPrice;
          order.productId = null;
          order.products = order.products.filter(
            (product) => product.id !== action.order.productId
          );
          return order;
        }
        return order;
      });
    case ADD_TO_ORDER:
      return [...state].map((order) => {
        if (order.userId === action.order.userId) {
          order.totalItems += action.order.totalItems;
          order.totalPrice += action.order.totalPrice;
          return order;
        }
        return order;
      });
    case UPDATE_ORDER:
      return [...state].map((order) => {
        if (order.userId === action.order.userId) {
          order.totalItems = action.order.totalItems;
          order.totalPrice = action.order.totalPrice;
          return order;
        }
        return order;
      });
    default:
      return state;
  }
};
