import React, { Component, Fragment, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
// import { Login, Signup } from "./components/AuthForm";
import Login_Page from "./components/Login_Page";
import SignUp_Page from "./components/SignUp_Page";
import Home from "./components/Home";
import { me } from "./store";
import SingleProduct from "./components/products/SingleProduct";

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/singleProduct" component={SingleProduct} />
          {/* <Redirect to="/login" /> */}
        </Switch>
      ) : (
        <Switch>
          <Route path="/" exact component={Login_Page} />
          <Route path="/login" exact component={Login_Page} />
          <Route path="/signup" exact component={SignUp_Page} />
        </Switch>
      )}
    </div>
  );
};

// class Routes extends Component {
//   componentDidMount() {
//     this.props.loadInitialData();
//   }

//   render() {
//     const { isLoggedIn } = this.props;

//     return (
//       <div>
//         {isLoggedIn ? (
//           <Switch>
//             <Route path="/home" component={Home} />
//             <Route path="/home" component={SingleProduct} />
//             {/* <Redirect to="/login" /> */}
//           </Switch>
//         ) : (
//           <Switch>
//             <Route path="/" exact component={Login_Page} />
//             <Route path="/login" exact component={Login_Page} />
//             <Route path="/signup" exact component={SignUp_Page} />
//           </Switch>
//         )}
//       </div>
//     );
//   }
// }

// const mapState = (state) => {
//   return {
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     loadInitialData() {
//       dispatch(me());
//     },
//   };
// };

export default Routes;
