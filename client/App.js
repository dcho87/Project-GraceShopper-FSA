import React from "react";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes";
import "./App.css";

const App = () => {
  return (
    <div className="main">
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;