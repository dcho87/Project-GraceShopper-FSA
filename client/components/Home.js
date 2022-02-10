import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const user = useSelector((state) => state.auth);
  const products = useSelector((state) => state.products);

  console.log("products");
  console.log(products);
  return (
    <div>
      <h1>home page component has loaded, user is logged in</h1>
      <div>the user is logged in</div>
      <div>Welcome, {user.first_name}</div>
      <div>first name: {user.first_name}</div>
      <div>email: {user.email}</div>
    </div>
  );
};

export default Home;
