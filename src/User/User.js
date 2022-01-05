import React from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/authContext"
import { useStateContext } from "../Context/stateContext"

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
    <div>
      <h1>User Details</h1>
      <p>FirstName: {user.userData.firstName}</p>
      <p>LastName: {user.userData.lastName}</p>
      <p>Email: {user.userData.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default User
