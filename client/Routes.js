import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { me } from "./store";
import Login_Page from "./components/LoginSignup/Login_Page";
import SignUp_Page from "./components/LoginSignup/SignUp_Page";
import Products from "./components/products/Products";
import Single_Category_Page from "./components/categories/Single_Category_Page";
import Cart from "./components/cart/Cart";
import Bio from "./components/bio/Bio";
// import Password from "./components/bio/Password";
import Single_Product_Page from "./components/products/Single_Product_Page";
import Login_Popup from "./components/LoginSignup/Login_Popup";
import Product_Edit from "./components/products/Product_Edit";
import Checkout_Page from "./components/checkout/Checkout_Page";
import Previous_Orders_Page from "./components/previous_orders/Previous_Orders_Page";
import Product_Create from "./components/products/Product_Create";

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isLoggedIn = useSelector((state) => !!state.auth.id);

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route exact path="/home" component={Products} />
          <Route
            exact
            path="/products/Kangaroos"
            component={Single_Category_Page}
          />
          <Route exact path="/products/Apes" component={Single_Category_Page} />
          <Route exact path="/products/Cars" component={Single_Category_Page} />
          <Route
            exact
            path="/products/Doodles"
            component={Single_Category_Page}
          />
          <Route
            exact
            path="/products/Landscapes"
            component={Single_Category_Page}
          />
          <Route
            exact
            path="/products/Punks"
            component={Single_Category_Page}
          />
          <Route
            exact
            path="/products/People"
            component={Single_Category_Page}
          />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/bio" component={Bio} />
          {/* <Route exact path="/password" component={Password} /> */}
          <Route exact path="/products/:id" component={Single_Product_Page} />
          <Route exact path="/products/edit/:id" component={Product_Edit} />
          <Route exact path="/products/create" component={Product_Create} />

          {/* {isAdmin === true ? (
            <div>
         
            </div>
          ) : (
            ""
          )} */}
          <Route exact path="/orders/checkout" component={Checkout_Page} />
          <Route
            exact
            path="/orders/previous_orders"
            component={Previous_Orders_Page}
          />
        </Switch>
      ) : (
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <Login_Popup />
                <Products />
              </div>
            )}
          />
          <Route path="/login" exact component={Login_Page} />
          <Route path="/signup" exact component={SignUp_Page} />
          <Route path="/home" component={Products} />
        </Switch>
      )}
    </div>
  );
};

export default Routes;
