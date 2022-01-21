import axios from "axios"
import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()
export function setupAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`)
  }
  delete axios.defaults.headers.common["Authorization"]
}

export function setupAuthExceptionHandler(logoutUser) {
  const UNAUTHORIZED = 401
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logoutUser()
        window.location = "/login"
      }
      return Promise.reject(error)
    }
  )
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

  const logoutUser = () => {
    localStorage.removeItem("authToken")
    setUser({ isLoggedIn: false, userData: {} })
  }

  setupAuthExceptionHandler(logoutUser)
  const [error, setError] = useState("")
  const values = { user, setUser, error, setError }
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
