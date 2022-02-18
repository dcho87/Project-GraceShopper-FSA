import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchOrders, me } from "./store/index.js";

const App = () => {
  const dispatch = useDispatch();
  const hash = useLocation().hash;
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchOrders());
    dispatch(me());
  }, []);

  const user = useSelector((state) => state.auth);
  const isLoggedIn = !!user.id;

  return (
    <Router>
      {hash === "#/signup" || hash === "#/login" ? (
        ""
      ) : (
        <Navbar user={isLoggedIn ? user : "n/a"} />
      )}
      <div className="routes">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
