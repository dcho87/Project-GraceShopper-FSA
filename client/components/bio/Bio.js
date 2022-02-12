import React from "react";
import { useSelector, connect } from "react-redux";
import { logout } from "../../store";
import { Link } from "react-router-dom";

const Bio = ({ handleClick }) => {
  const user = useSelector((state) => state.auth);
  console.log(user.email);
  return (
    <div>
      <h4>
        {user.first_name} {user.last_name} is logged in
      </h4>
      <h2>Welcome {user.first_name}</h2>

      <small> Email: {user.email} </small>
      <ul>
        this will include info about:
        <pre> </pre>
        <li>Number of past orders</li>
        <li>Previous shipping address</li>
        <pre> </pre>
        <li>
          Your last order, click a link to see it in seperate page?
          <pre></pre>I think it will have a time/date
        </li>
        <pre> </pre>
        <small>Much later, have last payment method</small>
      </ul>
      <button>
        <Link to="/login" onClick={handleClick}>
          Logout
        </Link>
      </button>
    </div>
  );
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatch)(Bio);
