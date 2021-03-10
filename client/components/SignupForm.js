import React, {useState, useRef} from 'react'

const SignupForm = props => {
  const {handleSubmit, displayName, name} = props
  const [errDisplay, setErrDisplay] = useState('')
  const [hasError, setHasError] = useState(false)
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const emailRef = useRef()

  function handleChange(event) {
    setErrDisplay('')
    setHasError(false)
    let current = event.target.name
    if (
      current === 'confirmPassword' &&
      confirmPasswordRef.current.value !== passwordRef.current.value
    ) {
      setHasError(true)
      setErrDisplay('Passwords do not match!')
    } else if (
      (current =
        ('email' && !emailRef.current.value.includes('@')) ||
        !emailRef.current.value.includes('.'))
    ) {
      setHasError(true)
      setErrDisplay('Must be valid email address')
    }
  }

  return (
    <>
      <div className="pageContainer">
        <div className="formContainer">
          <form className="signup" onSubmit={handleSubmit} name={name}>
            <h2 id="signUpText">Nice to Meet You!</h2>
            <p>Please complete the fields below to create your account.</p>
            {errDisplay && <div style={{color: 'maroon'}}>{errDisplay}</div>}
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
            <input
              name="email"
              type="text"
              ref={emailRef}
              onChange={handleChange}
            />

            <label htmlFor="password">
              <small>Password:</small>
            </label>
            <input
              name="password"
              type="password"
              ref={passwordRef}
              onChange={handleChange}
            />

            <label htmlFor="confirmPassword">
              <small>Confirm Password:</small>
            </label>
            <input
              name="confirmPassword"
              type="password"
              ref={confirmPasswordRef}
              onChange={handleChange}
            />

            <button type="submit" id="purpleBtn" disabled={hasError}>
              {displayName}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignupForm
