import axios from "axios";
import history from "../history";
const TOKEN = "token";
import configureMockStore from "redux-mock-store";
import { thunkMiddleware, thunk } from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

//////////////////////////////////// ACTION TYPES below:

const LOAD_USERS = "LOAD_USERS";
const SET_AUTH = "SET_AUTH";
const ADD_USER = "ADD_USER";

//////////////////////////////////// ACTION CREATORS below:

export const _loadUsers = (users) => {
  return { type: LOAD_USERS, users };
};

const _addUser = (user) => {
  return { type: ADD_USER, user };
};

export const setAuth = (auth) => ({ type: SET_AUTH, auth });

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);

  if (token) {
    const response = await axios.get("/api/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(response.data));
  }
};

export const authenticate = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post("api/auth", { email, password });
    const { token } = response.data;
    window.localStorage.setItem(TOKEN, token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  return {
    type: SET_AUTH,
    auth: {},
  };
};

export const addUser = (user) => {
  return async (dispatch) => {
    user = (await axios.post("/api/add/auth", user)).data;
    dispatch(_addUser(user));
  };
};

//////////////////////////////////// THUNKS below:

const loadUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get("/api/users")).data;
    dispatch(_loadUsers(users));
  };
};

export const init = () => {
  return async (dispatch) => {
    dispatch(loadUsers());
  };
};

//////////////////////////////////// REDUCERS below:
const users = (state = [], action) => {
  switch (action.type) {
    case LOAD_USERS:
      return action.users;
    case ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
};

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}

const reducer = combineReducers({
  users,
});

const store = createStore(reducer);
