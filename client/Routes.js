import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { me } from "./store";
import Login_Page from "./components/Login_Page";
import SignUp_Page from "./components/SignUp_Page";
import Products from "./components/products/Products";
import SingleCategory_Page from "./components/categories/SingleCategory_Page";
import Cart from "./components/cart/Cart";
import Bio from "./components/bio/Bio";

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
          <Route path="/products/animals" component={SingleCategory_Page} />
          <Route path="/products/apes" component={SingleCategory_Page} />
          <Route path="/products/cars" component={SingleCategory_Page} />
          <Route path="/products/doodles" component={SingleCategory_Page} />
          <Route path="/products/landscapes" component={SingleCategory_Page} />
          <Route path="/products/punks" component={SingleCategory_Page} />
          <Route
            path="/products/stick_figures"
            component={SingleCategory_Page}
          />
          <Route path="/cart" component={Cart} />
          <Route path="/bio" component={Bio} />
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

export default Routes;
