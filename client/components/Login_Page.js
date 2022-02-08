import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { me, authenticate } from "../store/auth";

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

  // const onSubmit = (ev) => {
  //   ev.preventDefault();
  //   signIn({
  //     email,
  //     password,
  //   });
  //   location.hash = "#/home"; //where the user is sent after they succesfully login
  // };

  return (
    <main id="login_page">
      <form onSubmit={onSubmit}>
        <div id="form-cont-login">
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
                placeholder="password"
                value={password}
                onChange={onChange}
                name="password"
              />
            </div>
          </div>
          <div id="submit-cont">
            <button id="submit-info">Login</button>
          </div>
        </div>
      </form>
    </main>
  );
};

// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.email.value
//       const password = evt.target.password.value
//       dispatch(authenticate(username, password, formName))
//     }
//   }
// }

export default Login_Page;

// export default connect (mapLogin, mapDispatch)(Login_Page)
