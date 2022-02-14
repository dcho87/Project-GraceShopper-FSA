import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { logout } from "../../store";
import { Link } from "react-router-dom";
import BioUpdate from "./BioUpdate";

const Bio = () => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  console.log(user);

  return (
    <div>
      <h3>Welcome {user.first_name}</h3>
      <h2>Update User Details Below</h2>

      <BioUpdate history={history} user={user} />

      <ul>
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
        <Link to="/password">Change Password Here</Link>
      </button>

      <button>
        <Link to="/login" onClick={() => dispatch(logout())}>
          Logout
        </Link>
      </button>
    </div>
  );
};

export default Bio;
