import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";

const App = () => {
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
