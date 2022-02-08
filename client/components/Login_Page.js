import React, { useState } from "react";
import { connect } from "react-redux";

const Login_Page = ({ signIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (ev) => {
    ev.target.name === "email"
      ? setEmail(ev.target.value)
      : setPassword(ev.target.value);
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    signIn({
      email,
      password,
    });
    location.hash = "#/home"; //where the user is sent after they succesfully login
  };

  return (
    <main id="login_page">
     
      <form onSubmit={onSubmit}>
   
        <div id="form-cont-login">
        <div>NFT SHOP</div>
          <div className="login-cont">
            <div id="email-cont">
              <input
                id="email-info"
                placeholder="email"
                value={email}
                onChange={onChange}
                name="email"
              />
            </div>
            <div id="pw-cont">
              <input
                id="pw-info"
                placeholder="Password (Case Sensitive)"
                value={password}
                onChange={onChange}
                name="password"
                type="password"
              />
            </div>
          </div>
          <div id="submit-cont">
            <button id="submit-info" disabled={!email || !password}>Login</button>
            
          </div>
        </div>
      </form>
    </main>
  );
};

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}


const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.email.value
      const password = evt.target.password.value
      dispatch(authenticate(username, password, formName))
    }
  }
}




export default connect (mapLogin, mapDispatch)(Login_Page)