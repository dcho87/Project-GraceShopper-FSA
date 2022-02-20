import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/auth";

import "./Login_Popup.css";

const Login_Popup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setstate] = useState("none");
  useEffect(() => {
    setTimeout(() => {
      setstate("block");
    }, 3000);
  }, []);

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
    <div id="login_popup_page" style={{ display: state }}>
      <button onClick={() => setstate("none")}>X</button>
      <form onSubmit={onSubmit}>
        <h1>Sign in to have the best experience</h1>
        <div className="form-cont-login">
          <div className="login-cont">
            <div className="email-cont">
              <input
                className="email-info"
                placeholder="Email"
                value={email}
                onChange={onChange}
                name="email"
              />
            </div>
            <div className="pw-cont">
              <input
                className="pw-info"
                placeholder="Password"
                value={password}
                onChange={onChange}
                name="password"
                type="password"
              />
            </div>
          </div>
          <div className="submit-cont">
            <button className="submit-info">Sign in</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login_Popup;
