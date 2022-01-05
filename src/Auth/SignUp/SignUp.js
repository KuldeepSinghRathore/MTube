import axios from "axios"
import React, { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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
  const [error, setError] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  console.log(signUpDetails)
  const handleChange = (e) => {
    setSignUpDetails({
      ...signUpDetails,
      [e.target.name]: e.target.value,
    })
  }
  const signUpHandler = async (e) => {
    try {
      e.preventDefault()
      const { firstName, lastName, email, password } = signUpDetails
      if (firstName && lastName && email && password) {
        const { status, data } = await axios.post(
          `${API}/user/signup`,
          signUpDetails
        )
        if (status === 200) {
          localStorage.setItem(
            "authToken",
            JSON.stringify({ isLoggedIn: true, userData: data.userData })
          )
          setUser({ ...user, isLoggedIn: true, userData: data.userData })

          navigate("/")
        } else {
          navigate(path === null ? "/login" : path.from)
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
    <div className="signup">
      <h1>Create User Account</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={signUpHandler}>
        <label>firstName:</label>
        <input
          type="text"
          name="firstName"
          value={signUpDetails.firstName}
          onChange={handleChange}
        />
        <label>lastName:</label>
        <input
          type="text"
          name="lastName"
          value={signUpDetails.lastName}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={signUpDetails.email}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={signUpDetails.password}
          onChange={handleChange}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <input
          type="submit"
          value="SignUp"
          disabled={signUpDetails.password !== confirmPass}
        />
      </form>
    </div>
  )
}
