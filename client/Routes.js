import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { me } from "./store";
import Login_Page from "./components/Login_Page";
import SignUp_Page from "./components/SignUp_Page";
import Products from "./components/products/Products";
import Single_Category_Page from "./components/categories/Single_Category_Page";
import Cart from "./components/cart/Cart";
import Bio from "./components/bio/Bio";
// import Password from "./components/bio/Password";
import Single_Product_Page from "./components/products/Single_Product_Page";
import Login_Popup from "./components/Login_Popup";
import Checkout_Page from "./components/checkout/Checkout_Page";
import Previous_Orders_Page from "./components/previous_orders/Previous_Orders_Page";

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
          <Route path="/home" component={Products} />
          <Route path="/products/Kangaroos" component={Single_Category_Page} />
          <Route path="/products/Apes" component={Single_Category_Page} />
          <Route path="/products/Cars" component={Single_Category_Page} />
          <Route path="/products/Doodles" component={Single_Category_Page} />
          <Route path="/products/Landscapes" component={Single_Category_Page} />
          <Route path="/products/Punks" component={Single_Category_Page} />
          <Route path="/products/People" component={Single_Category_Page} />
          <Route path="/cart" component={Cart} />
          <Route path="/bio" component={Bio} />
          {/* <Route path="/password" component={Password} /> */}
          <Route path="/products/:id" component={Single_Product_Page} />
          <Route path="/orders/checkout" component={Checkout_Page} />
          <Route
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
