import axios from "axios";

const LOAD_ORDERS = "LOAD_ORDERS";
const ADD_TO_ORDER = "ADD_TO_ORDER";
const LOAD_ORDER_DETAILS = "LOAD_ORDER_DETAILS";
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
    order = (await axios.put(`/api/orders/${order.id}`, order)).data;
    dispatch(_addToOrder(order));
  };
};

export const deleteOrder = (order, product) => {
  return async (dispatch) => {
    console.log("order before axios call", order);
    order.productIdToRemove = product.id;
    // order.products.filter((prod) => prod.id !== product.id);
    console.log("order before axios call, but after filter", order);
    order = (await axios.put(`/api/orders/deleteOrder/${order.id}`, order))
      .data;
    console.log("order after axios call", order);
    dispatch(_deleteOrder(order));
  };
};

export const fetchOrderDetails = (user) => {
  return async (dispatch) => {
    const orderDetails = (await axios.get(`/api/users/order/${user.id}`)).data;
    dispatch(_loadOrderDetails(orderDetails));
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
          console.log("action.order", action.order);
          order.totalItems = action.order.totalItems;
          order.totalPrice = action.order.totalPrice;
          order.productIdToRemove = null;
          order.products = order.products.filter(
            (product) => product.id !== action.order.productIdToRemove
          );
          return order;
        }
        return order;
      });
    case ADD_TO_ORDER:
      return [...state].map((order) => {
        if (order.userId === action.userId) {
          order.totalItems += action.totalItems;
          order.totalPrice += action.totalPrice;
          return order;
        }
        return order;
      });
    default:
      return state;
  }
};
