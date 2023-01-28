import React from 'react'
import LoginForm from '../component/auth/LoginForm'
import RegisterForm from '../component/auth/RegisterForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext)
  let body

  if (authLoading) {
    body = (
      <div className="d-flex justif-content-center mt-2">
        <Spinner animation="boder" variant="info" />
      </div>
    )
  } else if (isAuthenticated) return <Navigate to="/dashboard" />
  else
    body = (
      <>
        {authRoute === 'login' && <LoginForm />}{' '}
        {authRoute === 'register' && <RegisterForm />}
      </>
    )
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>LearnIt</h1>
          <h4>Keep track of what you learning</h4>
          {body}
        </div>
      </div>
    </div>
  )
}

export default Auth
