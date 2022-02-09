import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import "./App.css";

const App = async () => {
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
