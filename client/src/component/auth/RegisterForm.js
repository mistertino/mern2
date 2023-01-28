import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'

const RegisterForm = () => {
 // Load AuthContext
 const { registerUser } = useContext(AuthContext)

 // Local State
 const [registerForm, setRegisterForm] = useState({
   username: '',
   password: '',
   confirmPassword: ''
 })

 const [alert, setAlert] = useState(null)

 const { username, password, confirmPassword } = registerForm

 // Func set state
 const onChangeRegisterForm = (event) =>
   setRegisterForm({ ...registerForm, [event.target.name]: event.target.value })

 // Func for submit login form
 const handleRegister = async (event) => {
   event.preventDefault()
   if (password !== confirmPassword){
    setAlert({type: 'danger', message: 'Password do not match'})
    setTimeout(() => setAlert(null), 5000)
    return
   }
   try {
     const registerData = await registerUser(registerForm)
     if (!registerData.success) {
       setAlert({ type: 'danger', message: registerData.message })
     }
   } catch (error) {
     console.log(error)
   }
 }

  return (
    <>
      <Form className="my-4" onSubmit={handleRegister}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            className="my-3"
            value={username}
            onChange={onChangeRegisterForm}
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
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            className="my-3"
            value={confirmPassword}
            onChange={onChangeRegisterForm}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  )
}

export default RegisterForm
