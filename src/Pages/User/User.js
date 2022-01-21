import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "Context/authContext"
import { useStateContext } from "Context/stateContext"
import "./User.css"
const User = () => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const { dispatch } = useStateContext()
  const logout = () => {
    localStorage.clear()
    setUser({ isLoggedIn: false, userData: {} })
    dispatch({ type: "LOGOUT" })
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
