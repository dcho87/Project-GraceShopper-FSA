import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import "./App.css";
import SingleProduct from "./components/products/SingleProduct";

const App = () => {
  return (
    <Router>
      <div className="main">
        <Navbar />
        <Routes />
        {/* <SingleProduct /> */}
      </div>
    </Router>
  );
};

export default App;
