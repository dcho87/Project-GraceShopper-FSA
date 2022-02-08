import React from 'react'
import {connect} from 'react-redux'
import {authenticate} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, handleSubmit, error} = props

  return (
    <div>
      &#128274; Create Secure Account 
      <form onSubmit={handleSubmit} name={name}>
      <div>
          <label htmlFor="first_name">
          </label>
          <input name="first_name" type="first_name" placeholder="First Name"/>
        </div>
        <div>
          <label htmlFor="last_name">
          </label>
          <input name="last_name" type="last_name" placeholder="Last Name" />
        </div>
        <div>
          <label htmlFor="email">
          </label>
          <input name="email" type="text" placeholder="Email" />
        </div>
        <div>
          <label htmlFor="password">
          </label>
          <input name="password" type="password" placeholder="Password"/>
        </div>
        <div>
          <label htmlFor="password">
          </label>
          <input name="password" type="password"  placeholder="Confirm Password"/>
        </div>
     
        
        <div>
          <button type="submit"  > Create Account</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.auth.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
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

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)
