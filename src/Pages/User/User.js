import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "Context/authContext"
import { useStateContext } from "Context/stateContext"
import "./User.css"
import { usePlaylist } from "Context/playlistContext"
const User = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const { dispatch } = useStateContext()
  const { playlistDispatch } = usePlaylist()
  const logout = () => {
    localStorage.removeItem("authToken")
    setUser({ isLoggedIn: false, userData: {} })
    dispatch({ type: "LOGOUT" })
    playlistDispatch({ type: "LOGOUT" })
    navigate("/")
  }
  return (
    <>
      <div className="user">
        <h1>User Details</h1>
        <div className="user__content">
          <p>
            <span>FirstName:</span> {user.userData.firstName}
          </p>
          <p>
            <span>LastName:</span> {user.userData.lastName}
          </p>
          <p>
            <span>Email:</span> {user.userData.email}
          </p>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  )
}

export default User
