import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children, user }) => {
  const location = useLocation()

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />
  }
  return <>{React.cloneElement(children, { user })}</>
}
