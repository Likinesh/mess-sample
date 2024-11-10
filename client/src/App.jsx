import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/resetpassword/:token' element={<ResetPassword/>}></Route>
        <Route path='/dashbroad' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App