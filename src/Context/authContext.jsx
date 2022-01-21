import axios from "axios"
import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()
export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`)
  }
  delete axios.defaults.headers.common["Authorization"]
}
export const AuthProvider = ({ children }) => {
  const { isLoggedIn: savedLogin, userData: savedUserData } = JSON.parse(
    localStorage.getItem("authToken")
  ) || {
    isLoggedIn: false,
    userData: {},
  }
  const [user, setUser] = useState({
    isLoggedIn: savedLogin,
    userData: savedUserData,
  })
  const [error, setError] = useState("")
  const values = { user, setUser, error, setError }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
