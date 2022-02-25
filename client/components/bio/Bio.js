import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { fetchHistory, logout } from "../../store";
import { Link } from "react-router-dom";
import BioUpdate from "./BioUpdate";
import "./Bio.css";

const Bio = () => {
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // console.log(user);

  useEffect(() => {
    dispatch(fetchHistory(user));
  }, []);

  return (
    <div>
      <div className="header-bio">
        <Link to="/orders/previous_orders">View Previous Orders</Link>
        <h2>Welcome {user.first_name}</h2>
        <h4>Update User Details Below</h4>
      </div>
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

      <button className="button2">
        <Link to="/login" onClick={() => dispatch(logout())}>
          Logout
        </Link>
      </button>
    </div>
  );
};

export default Bio;
