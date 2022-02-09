import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { fetchProducts } from "./store/product_store";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import "./App.css";

const App = async () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  await setProducts(dispatch(fetchProducts()));

  console.log(products);
  return (
    <Router>
      <div className="main">
        <Navbar />
        <Routes />
      </div>
    </Router>
  );
};

export default App;
