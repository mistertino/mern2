import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const LoginForm = () => {
  // Route
  const navigate = useNavigate()
  // Load AuthContext
  const { loginUser } = useContext(AuthContext)

  // Local State
  const [userForm, setUserForm] = useState({
    username: '',
    password: '',
  })

  const [alert, setAlert] = useState(null)

  const { username, password } = userForm

  // Func set state
  const onChangeLoginForm = (event) =>
    setUserForm({ ...userForm, [event.target.name]: event.target.value })

  // Func for submit login form
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginData = await loginUser(userForm)
      if (loginData.success) {
        navigate('/dashboard')
      } else {
        setAlert({ type: 'danger', message: loginData.message })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Form className="my-4" onSubmit={handleLogin}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            className="my-3"
            value={username}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            className="my-3"
            value={password}
            onChange={onChangeLoginForm}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-4">
            Register
          </Button>
        </Link>
      </p>
    </>
  )
}

export default LoginForm
