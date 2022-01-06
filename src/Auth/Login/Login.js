import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/authContext"
import { useStateContext } from "../../Context/stateContext"
import { API } from "../../Utils/API"
import "./Login.css"
const Login = () => {
  const { dispatch } = useStateContext()
  const path = useLocation().state

  const navigate = useNavigate()
  const { user, setUser } = useAuth()
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
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

  console.log(user, "user.isLoggedIn")

  // useEffect Get History
  const getHistory = async (urlId) => {
    try {
      console.log(user, "from login getHistory")
      const { status, data } = await axios.get(`${API}/api/history/${urlId}`)

      if (status === 200) {
        dispatch({
          type: "LOAD_HISTORY",
          payload: data.history.historyItems,
        })
      }
    } catch (error) {
      console.log(error)
      const { status, data } = error.response
      if (status !== 200) {
        setError(data.message)
      }
    }
  }
  const getLiked = async (urlId) => {
    try {
      const { status, data } = await axios.get(`${API}/api/liked/${urlId}`)

      if (status === 200) {
        dispatch({
          type: "LOAD_LIKED",
          payload: data.liked.likedItems,
        })
      }
    } catch (error) {
      console.log(error)
      const { status, data } = error.response
      if (status !== 200) {
        setError(data.message)
      }
    }
  }
  const getSaved = async (urlId) => {
    try {
      const { status, data } = await axios.get(`${API}/api/saved/${urlId}`)

      if (status === 200) {
        dispatch({
          type: "LOAD_SAVED",
          payload: data.saved.savedItems,
        })
      }
    } catch (error) {
      console.log(error)
      const { status, data } = error.response
      if (status !== 200) {
        setError(data.message)
      }
    }
  }
  const getPlaylist = async (urlId) => {
    try {
      const { status, data } = await axios.get(`${API}/api/playlist/${urlId}`)

      if (status === 200) {
        dispatch({
          type: "LOAD_PLAYLIST",
          payload: data.playlist,
        })
      }
    } catch (error) {
      console.log(error)
      const { status, data } = error.response
      if (status !== 200) {
        setError(data.message)
      }
    }
  }

  useEffect(() => {
    if (user?.isLoggedIn && user?.userData?.userId) {
      console.log(user, user.userData.userId, "from login useEffect")
      getHistory(user.userData.userId)
    }
  }, [user.isLoggedIn])
  useEffect(() => {
    if (user?.isLoggedIn && user?.userData?.userId) {
      console.log(user, user.userData.userId, "from login useEffect")
      getLiked(user.userData.userId)
    }
  }, [user.isLoggedIn])
  useEffect(() => {
    if (user?.isLoggedIn && user?.userData?.userId) {
      console.log(user, user.userData.userId, "from login useEffect")
      getSaved(user.userData.userId)
    }
  }, [user.isLoggedIn])
  useEffect(() => {
    if (user?.isLoggedIn && user?.userData?.userId) {
      console.log(user, user.userData.userId, "from login useEffect")
      getPlaylist(user.userData.userId)
    }
  }, [user.isLoggedIn])

  return (
    <>
      <div className="login">
        {error && <p className="error">{error}</p>}
        <p className="login__text">Login</p>
        <form onSubmit={handleLogin}>
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
    </>
  )
}

export default Login
