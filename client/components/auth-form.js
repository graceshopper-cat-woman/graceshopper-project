import React from 'react'
import {connect} from 'react-redux'
import SignupForm from './SignupForm'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  if (name === 'signup') {
    return <SignupForm {...props} />
  }
  return (
    <div className="pageContainer">
      <div className="signInContainer">
        <div>
          <form className="signIn" onSubmit={handleSubmit} name={name}>
            <h2 id="signUpText">Yay! You're back!</h2>
            <p>Please use you login credentials to access your account.</p>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input name="email" type="text" />

            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" />

            <button id="purpleBtn" type="submit">
              {displayName}
            </button>

            {error &&
              error.response && (
                <div className="signIn"> {error.response.data} </div>
              )}
          </form>
        </div>
      </div>
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
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const info = {
        email: evt.target.email.value,
        password: evt.target.password.value
      }
      if (formName === 'signup') {
        info.firstName = evt.target.firstName.value
        info.lastName = evt.target.lastName.value
      }
      dispatch(auth(info, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
