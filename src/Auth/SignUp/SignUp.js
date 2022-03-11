import axios from "axios"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { useAuth } from "../../Context/authContext"
import { API } from "../../Utils/API"
import "./SignUp.css"
export const SignUp = () => {
  const navigate = useNavigate()
  const path = useLocation().state
  const { user, setUser } = useAuth()
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [isSigning, setSigningUp] = useState(false)
  const handleChange = (e) => {
    setSignUpDetails({
      ...signUpDetails,
      [e.target.name]: e.target.value,
    })
  }
  const signUpHandler = async (e) => {
    e.preventDefault()
    const errorObj = {}
    const { firstName, lastName, email, password } = signUpDetails
    if (firstName?.length === 0) {
      errorObj.firstName = "firstName is required"
    }
    if (lastName?.length === 0) {
      errorObj.lastName = "lastName is required"
    }
    if (email?.length === 0) {
      errorObj.email = "Email is required"
    }
    if (password?.length === 0) {
      errorObj.password = "Password is required"
    }
    if (confirmPass?.length === 0) {
      errorObj.confirmPass = "Re-Type Password is required"
    }
    setFormError(errorObj)
    try {
      if (firstName && lastName && email && password) {
        setSigningUp(true)
        const { status, data } = await axios.post(
          `${API}/user/signup`,
          signUpDetails
        )
        if (status === 200) {
          localStorage.setItem(
            "authToken",
            JSON.stringify({ isLoggedIn: true, userData: data.userData })
          )

          setUser({ ...user, isLoggedIn: true, userData: data?.userData })
          toast.success("SignUp Successful")

          navigate(path === null ? "/" : path?.from)
        }
      }
    } catch (error) {
      console.log(error)
      const { status, data } = error.response
      if (status !== 200) {
        setError(data.message)
      }
    }
  }
  return (
    <div className="container-signup">
      <h1>Create User Account</h1>
      <div className="signup">
        <form onSubmit={signUpHandler} className="form__signup">
          {error && <h2 className="error">{error}</h2>}
          <label>FirstName:</label>
          <input
            type="text"
            name="firstName"
            value={signUpDetails.firstName}
            onChange={handleChange}
          />
          {formError?.firstName?.length > 0 &&
            signUpDetails.firstName?.length === 0 && (
              <p className="signup-error">{formError.firstName}</p>
            )}
          <label>LastName:</label>
          <input
            type="text"
            name="lastName"
            value={signUpDetails.lastName}
            onChange={handleChange}
          />
          {formError?.lastName?.length > 0 &&
            signUpDetails?.lastName?.length === 0 && (
              <p className="signup-error">{formError.lastName}</p>
            )}
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={signUpDetails.email}
            onChange={handleChange}
          />
          {formError?.email?.length > 0 &&
            signUpDetails?.email?.length === 0 && (
              <p className="signup-error">{formError.email}</p>
            )}
          <label>Password:</label>
          <input
            type="password"
            name="password"
            minLength="6"
            value={signUpDetails.password}
            onChange={handleChange}
          />
          {formError?.password?.length > 0 &&
            signUpDetails?.password?.length === 0 && (
              <p className="signup-error">{formError.password}</p>
            )}
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            minLength="6"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
          />

          {signUpDetails.password === confirmPass ? (
            <input
              type="submit"
              value={isSigning ? "SigningUp..." : "SignUp"}
            />
          ) : (
            <input type="button" className="disabled-input" />
          )}
        </form>
      </div>
    </div>
  )
}
