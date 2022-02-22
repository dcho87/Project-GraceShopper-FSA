import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, useLocation } from "react-router-dom";
import Navbar_User from "./components/navbar/Navbar_User";
import Navbar_No_User from "./components/navbar/Navbar_No_User";
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
      {isLoggedIn ? <Navbar_User user={user} /> : <Navbar_No_User />}

      {/* {hash === "#/signup" || hash === "#/login" ? (
        ""
      ) : (
        <Navbar_User user={isLoggedIn ? user : "n/a"} />
      )} */}
      <div className="routes">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
