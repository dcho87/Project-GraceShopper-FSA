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

//////////////////////////////////// ACTION CREATORS below:

export const _loadUsers = (users) => {
  return { type: LOAD_USERS, users };
};
export const setAuth = (auth) => ({ type: SET_AUTH, auth });

// export const me = () => async dispatch => {
//   const token = window.localStorage.getItem(TOKEN)
//   if (token) {
//     const res = await axios.get('/auth/me', {
//       headers: {
//         authorization: token
//       }
//     })
//     return dispatch(setAuth(res.data))
//   }
// }

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const response = await axios.get("/api/auth", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(response.data));
  }
};

// export const authenticate = (email, password, method) => async dispatch => {
//   try {
//     const res = await axios.post(`/auth/${method}`, {email, password})
//     window.localStorage.setItem(TOKEN, res.data.token)
//     dispatch(me())
//   } catch (authError) {
//     return dispatch(setAuth({error: authError}))
//   }
// }

export const authenticate = (email, password) => async (dispatch) => {
  try {
    console.log("authenticate is running");
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
  // history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
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
