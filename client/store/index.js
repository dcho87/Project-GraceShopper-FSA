import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
// import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
const { products } = require("./product_store");

const { users } = require("./users_store");

// const reducer = combineReducers({ auth }, products, categories, users);
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
// );
const reducer = combineReducers({ auth}, products, users );
const middleware = applyMiddleware(thunk);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
