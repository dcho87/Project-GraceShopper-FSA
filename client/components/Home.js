import React from 'react'
import {connect} from 'react-redux'
import { Link } from "react-router-dom";

/**
 * COMPONENT
 */
export const Home = ({user}) => {
  return (
    <div>
      <div>the user is logged in</div>
      <div>Welcome, {user.first_name}</div>
      <div>first name: {user.first_name}</div>
      <div>email: {user.email}</div>
      <Link to="/login" onClick={logout}>
        Logout
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.email
  }
}

export default connect(mapState)(Home)
