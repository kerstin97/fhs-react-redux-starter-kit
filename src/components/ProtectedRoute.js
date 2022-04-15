import React, { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { UserContext } from '../App'

export const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const user = useContext(UserContext)

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }
  return <>{React.cloneElement(children, { user })}</>
}
