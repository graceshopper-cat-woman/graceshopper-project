import React from 'react'

const SignupForm = props => {
  const {handleSubmit, displayName, name, error} = props
  return (
    <>
      <div className="pageContainer">
        <div className="formContainer">
          <form className="signup" onSubmit={handleSubmit} name={name}>
            <h2 id="signUpText">Nice to Meet You!</h2>
            <p>Please complete the fields below to create your account.</p>
            <label htmlFor="FirstName">
              <small>First Name:</small>
            </label>
            <input name="firstName" type="text" />

            <label htmlFor="LastName">
              <small>Last Name:</small>
            </label>
            <input name="lastName" type="text" />

            <label htmlFor="email">
              <small>Email:</small>
            </label>
            <input name="email" type="text" />

            <label htmlFor="password">
              <small>Password:</small>
            </label>
            <input name="password" type="password" />

            <label htmlFor="confirmPassword">
              <small>Confirm Password:</small>
            </label>
            <input name="confirmPassword" type="password" />

            <button type="submit" id="purpleBtn">
              {displayName}
            </button>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
      </div>
    </>
  )
}

export default SignupForm
