import React from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import NavBarLayout from '../layout/NavBarLayout'

const ProtectedRoute = ({ element: Element }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext)
  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    )
  return isAuthenticated ? <>
  <NavBarLayout />
  <Element />
  </> : <Navigate to="/login" />
}

export default ProtectedRoute
