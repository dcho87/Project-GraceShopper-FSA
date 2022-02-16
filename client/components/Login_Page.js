import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../store/auth";
import "./Login_Page.css";

const Login_Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (ev) => {
    ev.target.name === "email"
      ? setEmail(ev.target.value)
      : setPassword(ev.target.value);
  };

  const dispatch = useDispatch();

  const onSubmit = (ev) => {
    ev.preventDefault();
    dispatch(authenticate(email, password));
    location.hash = "#/home"; //where the user is sent after they succesfully login
  };

  return (
    <div className="login-page">
      <div className="login-poster">
        <div className="blur">
          <h1>NFT.com is the world's biggest NFT marketplace</h1>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="login-containter">
          <Link className="login-form-item" id="login-form-link" to="/">
            &#60; Marketplace
          </Link>
          <h1 className="login-header">Sign In</h1>
          <p>
            Don't have an account?{" "}
            <Link to="/signup" id="login-form-link">
              Sign up
            </Link>
          </p>
          <input
            className="login-form-item"
            id="email-info"
            placeholder="Email"
            value={email}
            onChange={onChange}
            name="email"
          />
          <input
            className="login-form-item"
            id="pw-info"
            placeholder="Password"
            value={password}
            onChange={onChange}
            name="password"
            type="password"
          />
          <button id="submit-info" className="login-form-item">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login_Page;
