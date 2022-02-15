import axios from "axios";

const LOAD_ORDERS = "LOAD_ORDERS";
const ADD_TO_ORDER = "ADD_TO_ORDER";
const LOAD_ORDER_DETAILS = "LOAD_ORDER_DETAILS";

const _loadOrders = (orders) => {
  return { type: LOAD_ORDERS, orders };
};

const _addToOrder = (order) => {
  return { type: ADD_TO_ORDER, order };
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
