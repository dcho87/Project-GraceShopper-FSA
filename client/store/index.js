import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import auth from "./auth";
const { products } = require("./product_store");

const { users } = require("./users_store");

const reducer = combineReducers({ auth, products, users });
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
