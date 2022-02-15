import React, { useState } from "react";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> main
import { addUser } from "../store/auth.js";
import "./Signup_Page.css";

const SignUp_Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

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

    const user = {
      email,
      password,
      first_name,
      last_name,
    };

    dispatch(addUser(user));
    location.hash = "#/login"; //where the user is sent after they succesfully login
  };

  return (
    <div className="signup-page">
      <form onSubmit={onSubmit} className="signup-containter">
        {/* <div className="signup-containter"> */}
        {/* &#128274; Create Secure Account */}
        {/* <div className="signup-form-item"> */}
        <Link className="signup-form-item" id="signup-form-link" to="/">
          &#60; Marketplace
        </Link>
        <h1 className="sign-up-header">Sign Up</h1>
        <p>
          Already have an account? <Link id="signup-form-link">Sign in</Link>
        </p>
        <input
          className="signup-form-item"
          placeholder="First Name"
          value={first_name}
          onChange={onChange}
          name="first_name"
        />
        {/* </div> */}
        {/* <div className="signup-form-item"> */}
        <input
          className="signup-form-item"
          placeholder="Last Name"
          value={last_name}
          onChange={onChange}
          name="last_name"
        />
        {/* </div> */}
        {/* <div className="signup-form-item"> */}
        <input
          className="signup-form-item"
          placeholder="Email"
          value={email}
          onChange={onChange}
          name="email"
        />
        {/* </div> */}
        {/* <div className="signup-form-item"> */}
        <input
          className="signup-form-item"
          placeholder="Password"
          value={password}
          onChange={onChange}
          name="password"
          type="password"
        />
        {/* </div> */}
        {/* <div id="submit-cont"> */}
        <div className="signup-form-item terms_cond">
          <input type="checkbox" />
          <p>
            By clicking Create Account, I hereby acknowledge that I agree to the
            NFT.com NFT Terms and Conditions and I've read the Privacy Notice.
          </p>
        </div>

        <button className="signup-form-item" id="submit-info">
          Create Account
        </button>
        {/* </div> */}
        {/* </div> */}
      </form>
      <div className="signup-poster">
        <div className="blur">
          <h1>
            A highly-curated platform for creating, collecting and trading
            unique NFTs
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp_Page;
