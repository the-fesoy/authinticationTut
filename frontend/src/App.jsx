import { ToastContainer } from 'react-toastify'
import'react-toastify/dist/ReactToastify.css'
// import React from 'react';
import Home from './pages/home'
import SignUp from './pages/signup'
import SignIn from './pages/SignIn'
import { BrowserRouter, Route , Routes} from 'react-router-dom'
import "./App.css"
import UserDashboard from './pages/user/UserDashboard'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/signin" element={<SignIn />} />
    
    <Route path="/user/dashboard" element={<PrivateRoute element={<UserDashboard />} />} />
    </Routes>
    <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
