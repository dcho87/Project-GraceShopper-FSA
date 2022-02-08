import { Component } from "react";
import React, { useState } from "react";
import { fetchProducts } from "./store/product_store";
import { fetchUsers } from "./store/users_store";
import { me, authenticate } from "./store/auth";
import axios from "axios";
import { HashRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Routes from "./Routes"; //dont need?
import Login_Page from "./components/Login_Page";
import store from "./store";
import { from } from "form-data";
import { connect, useDispatch, useSelector } from "react-redux";

const App = () => {
  // logout = () => {
  //   window.localStorage.removeItem("token");
  //   this.setState({ user: {} });
  // };

  const auth = useSelector((state) => state.auth);
  const state = useSelector((state) => state);

  console.log("auth", auth);
  console.log("state", state);

  return (
    <Router>
      <div className="main">
        <Navbar />
        {/* <Route
            exact
            path="/login"
            render={(props) => <Login_Page signIn={signIn} {...props} />}
          /> */}
        <Route exact path="/login" component={Login_Page} />

        {/* <Routes /> */}
      </div>
    </Router>
  );
};

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       products: store.getState().products,
//     };
//   }
//   async componentDidMount() {
//     store.dispatch(fetchProducts());
//     store.dispatch(fetchUsers());

//     store.subscribe(() => {
//       this.setState(store.getState());
//     });
//   }

//   // me();

//   // attemptTokenLogin = async () => {
//   //   const token = window.localStorage.getItem("token");
//   //   if (token) {
//   //     const response = await axios.get("/api/auth", {
//   //       headers: {
//   //         authorization: token,
//   //       },
//   //     });
//   //     this.setState({ user: response.data });
//   //   }
//   // };

//   // signIn = async (credentials) => {
//   //   let response = await axios.post("/api/auth", credentials);
//   //   const { token } = response.data;
//   //   window.localStorage.setItem("token", token);
//   //   this.attemptTokenLogin();
//   // };

//   logout = () => {
//     window.localStorage.removeItem("token");
//     this.setState({ user: {} });
//   };

//   render() {
//     console.log(this.state);
//     const { products } = this.state;
//     const { signIn, logout } = this;
//     return (
//       <Router>
//         <div className="main">
//           <Navbar />
//           {/* <Route
//             exact
//             path="/login"
//             render={(props) => <Login_Page signIn={signIn} {...props} />}
//           /> */}
//           <Route exact path="/login" component={Login_Page} />

//           {/* <Routes /> */}
//         </div>
//       </Router>
//     );
//   }
// }

export default App;
