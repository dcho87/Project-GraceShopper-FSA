import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/product_store";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="routes">
        <Routes />
      </div>
    </Router>
  );
};

export default App;
