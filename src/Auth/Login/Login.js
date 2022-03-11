import axios from "axios"
import React, { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/authContext"
import { API } from "../../Utils/API"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./Login.css"
const Login = () => {
  const path = useLocation().state

  const navigate = useNavigate()
  const { user, setUser, error } = useAuth()
  const [loggingIn, setLoggingIn] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  })
  const [hide, setHide] = useState(false)
  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    })
  }
  const guestLogin = async (e) => {
    e.preventDefault()

    try {
      setHide(true)
      setLoggingIn(true)
      const { data, status } = await axios.post(`${API}/user/login`, {
        email: "guest@test.com",
        password: "asdfasdf",
      })

      if (status === 200) {
        localStorage.setItem(
          "authToken",
          JSON.stringify({ isLoggedIn: true, userData: data?.userData })
        )
        setUser({ ...user, isLoggedIn: true, userData: data?.userData })
        setLoggingIn(false)
        toast.success("Login Successful")
        navigate(path === null ? "/" : path?.from)
      } else {
        navigate(path === null ? "/login" : path?.from)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleLogin = async (e) => {
    e.preventDefault()
    setSubmit(true)
    try {
      if (loginDetails?.email && loginDetails?.password) {
        setLoggingIn(true)
        const { data, status } = await axios.post(
          `${API}/user/login`,
          loginDetails
        )

        if (status === 200) {
          localStorage.setItem(
            "authToken",
            JSON.stringify({ isLoggedIn: true, userData: data?.userData })
          )
          setUser({ ...user, isLoggedIn: true, userData: data?.userData })
          setLoggingIn(false)
          toast.success("Login Successful")
          navigate(path === null ? "/" : path?.from)
        } else {
          navigate(path === null ? "/login" : path?.from)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin} className="login__form">
        <p className="login__text">Login</p>
        {error && <h2 className="error">{error}</h2>}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
        />
        {submit && !loginDetails.email && (
          <p className="login-error">Email is Required</p>
        )}
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
        />
        {submit && !(loginDetails.password.length >= 6) && (
          <p className="login-error">
            Password is Required & must have 6 character
          </p>
        )}
        <p>
          new user ? <Link to="/signup">Signup</Link>
        </p>
        {!hide && (
          <input
            type="submit"
            value={`${loggingIn ? "Logging In..." : "Login"}`}
          />
        )}

        <button onClick={guestLogin} className="guest-login">
          {loggingIn ? "Logging In..." : "Guest Login"}
        </button>
      </form>
    </div>
  )
}

export default Login
