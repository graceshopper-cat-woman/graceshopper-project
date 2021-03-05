import React, {useRef, useState} from 'react'

export function SignupForm() {
  //useState Hooks
  //   const [error, setError] = useState('')
  //   const [loading, setLoading] = useState(false)
  //Set Refs for Validation
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()

  //   async function handleSubmit(event) {
  //     event.preventDefault()
  //     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //       setShowError(true)
  //       return setError('Passwords do not match')
  //     }
  //     try {
  //       setError('')
  //       setLoading(true)
  //       await signUp(emailRef.current.value, passwordRef.current.value)
  //       setLoading(false)
  //       history.push('/')
  //       console.log('User Successfully Created!')
  //     } catch (error) {
  //       setError('Failed to create an account')
  //     }
  //   }
  return (
    <>
      <div className="pageContainer">
        <div className="formContainer">
          <form className="signup">
            <h2 id="signUpText">Nice to Meet You!</h2>
            <p>Please complete the fields below to create your account.</p>
            <label htmlFor="FirstName">
              <small>First Name:</small>
            </label>
            <input name="firstName" type="text" ref={firstNameRef} />

            <label htmlFor="LastName">
              <small>Last Name:</small>
            </label>
            <input name="lastName" type="text" ref={lastNameRef} />

            <label htmlFor="email">
              <small>Email:</small>
            </label>
            <input name="email" type="text" ref={emailRef} />

            <label htmlFor="password">
              <small>Password:</small>
            </label>
            <input name="password" type="password" ref={passwordRef} />

            <label htmlFor="confirmPassword">
              <small>Confirm Password:</small>
            </label>
            <input name="password" type="password" ref={passwordConfirmRef} />

            <button type="submit" id="signUpBtn">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
