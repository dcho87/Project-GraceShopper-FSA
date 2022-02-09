import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate } from "../store/auth";

const SignUp_Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onChange = (ev) => {
    switch (ev.target.name) {
      case "email":
        setEmail(ev.target.value);
        break;
      case "password":
        setPassword(ev.target.value);
        break;
      case "first_name":
        setFirstName(ev.target.value);
        break;
      case "last_name":
        setLastName(ev.target.value);
        break;
      default:
        throw "error";
    }
  };

  const dispatch = useDispatch();

  const onSubmit = (ev) => {
    ev.preventDefault();
    console.log([email, password, firstName, lastName]);

    // dispatch(authenticate(email, password));
    // location.hash = "#/home"; //where the user is sent after they succesfully login
  };

  return (
    <main id="login_page">
      <form onSubmit={onSubmit}>
      &#128274; Create Secure Account
        <div id="form-cont-login">
          <div className="login-cont">
          <div id="first-name-cont">
              <input
                id="first-name"
                placeholder="First Name"
                value={firstName}
                onChange={onChange}
                name="first_name"
              />
            </div>
            <div id="last-name-cont">
              <input
                id="last-name"
                placeholder="Last Name"
                value={lastName}
                onChange={onChange}
                name="last_name"
              />
            </div>
            <div id="email-cont">
              <input
                id="email-info"
                placeholder="Email"
                value={email}
                onChange={onChange}
                name="email"
              />
            </div>
            <div id="pw-cont">
              <input
                id="pw-info"
                placeholder="Password"
                value={password}
                onChange={onChange}
                name="password"
                type="password"
              />
            </div>
           
          </div>
          <div id="submit-cont">
            <button id="submit-info">Create Account</button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default SignUp_Page;
