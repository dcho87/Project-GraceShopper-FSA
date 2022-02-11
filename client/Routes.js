import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { me } from "./store";
import Login_Page from "./components/Login_Page";
import SignUp_Page from "./components/SignUp_Page";
import Products from "./components/products/Products";
import Product from "./components/products/Product";
import Animals from "./components/categories/Animals";
import Apes from "./components/categories/Apes";
import Cars from "./components/categories/Cars";
import Doodles from "./components/categories/Doodles";
import Landscapes from "./components/categories/Landscapes";
import Punks from "./components/categories/Punks";
import Stick_Figures from "./components/categories/Stick_Figures";
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
          <Route path="/products/kangaroos" component={Animals} />
          <Route path="/products/apes" component={Apes} />
          <Route path="/products/cars" component={Cars} />
          <Route path="/products/doodles" component={Doodles} />
          <Route path="/products/landscapes" component={Landscapes} />
          <Route path="/products/punks" component={Punks} />
          <Route path="/products/people" component={Stick_Figures} />
          <Route path="/products/:id" component={Product} exact/>
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
