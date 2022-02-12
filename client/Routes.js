import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { me } from "./store";
import Login_Page from "./components/Login_Page";
import SignUp_Page from "./components/SignUp_Page";
import Products from "./components/products/Products";
import Single_Category_Page from "./components/categories/Single_Category_Page";
import Cart from "./components/cart/Cart";
import Bio from "./components/bio/Bio";
import Single_Product_Page from "./components/products/Single_Product_Page";

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
          <Route path="/products/:id" component={Single_Product_Page} />
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
