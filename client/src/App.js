import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './component/layout/Landing'
import Auth from './views/Auth'
import AuthContextProvider from './contexts/AuthContext'
import DashBoard from './views/DashBoard'
import ProtectedRoute from './component/routing/ProtectedRoute'
import About from './views/About'
import PostContextProvider from './contexts/PostContext'

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route exact path="/login" element={<Auth authRoute="login" />} />
            <Route
              exact
              path="/register"
              element={<Auth authRoute="register" />}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={DashBoard} />}
            />
            <Route path="/about" element={<ProtectedRoute element={About} />} />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  )
}

export default App
