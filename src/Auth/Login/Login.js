import { height, width } from "@mui/system"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/authContext"
import { usePlaylist } from "../../Context/playlistContext"
import { useStateContext } from "../../Context/stateContext"
import { API } from "../../Utils/API"
import "./Login.css"
const Login = () => {
  const { dispatch } = useStateContext()
  const { playlistDispatch } = usePlaylist()
  const path = useLocation().state

  const navigate = useNavigate()
  const { user, setUser, error, setError } = useAuth()
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      if (loginDetails.email && loginDetails.password) {
        const { data, status } = await axios.post(
          `${API}/user/login`,
          loginDetails
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
    <div className="login">
      <form onSubmit={handleLogin} className="login__form">
        <p className="login__text">Login</p>
        {error && <h2 className="error">{error}</h2>}
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={loginDetails.email}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="text"
          name="password"
          value={loginDetails.password}
          onChange={handleChange}
        />
        <p>
          new user ? <Link to="/signup">Signup</Link>
        </p>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login
