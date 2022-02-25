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
        <Link to="/orders/previous_orders"> Order History </Link>
        <h2>Welcome {user.first_name}</h2>
        <h4>Manage Your Profiles</h4>
      </div>
      <BioUpdate history={history} user={user} />
    </div>
  );
};

export default Bio;
