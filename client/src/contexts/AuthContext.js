import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducers/authReducer'
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from './constants'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [authState, dispath] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  })

  // Authenticate user
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`)
      if (response.data.success) {
        dispath({
          type: 'SET_AUTH',
          payload: { isAuthenticated: true, user: response.data.user },
        })
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
      setAuthToken(null)

      dispath({
        type: 'SET_AUTH',
        payload: { isAuthenticated: false, user: null },
      })
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  // Register
  const registerUser = async (registerForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, registerForm)
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken,
        )
      await loadUser()
      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { success: false, message: error.message }
    }
  }

  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm)
      if (response.data.success)
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken,
        )
      await loadUser()
      return response.data
    } catch (error) {
      if (error.response.data) return error.response.data
      else return { success: false, message: error.message }
    }
  }

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    dispath({type: 'SET_AUTH',
    payload: { isAuthenticated: false, user: null },
  })
  }

  // Context data
  const authContextData = { loginUser, authState, registerUser, logoutUser }
  // Return
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
