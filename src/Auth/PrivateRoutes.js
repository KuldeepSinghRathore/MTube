import { useAuth } from "Context/authContext"
import { Navigate, useLocation } from "react-router-dom"

export const PrivateRoutes = ({ children }) => {
  const { user } = useAuth()
  let location = useLocation()

  if (!user.userData.token) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}
