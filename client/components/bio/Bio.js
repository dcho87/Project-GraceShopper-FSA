import React, { useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { fetchHistory, logout } from "../../store";
import { Link } from "react-router-dom";
import BioUpdate from "./BioUpdate";
import "./Bio.css";
import Previous_Orders_Page from "../previous_orders/Previous_Orders_Page";

const Bio = () => {
  const user = useSelector((state) => state.auth);
  const userOrders = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log("userOrders", userOrders);

  // useEffect(() => {
  //   dispatch(fetchHistory(user));
  // }, []);

  return (
    <div>
      <div className="header-bio">
        <h1>Manage Your Profiles</h1>
      </div>
      <BioUpdate history={history} user={user} />
      <Previous_Orders_Page userOrders={userOrders} />
    </div>
  );
};

export default Bio;
