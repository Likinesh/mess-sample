import React, { useState } from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
import '../App.css'

const Login = () => {
    const navigate=useNavigate();
    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    
    const handleSubmit = async(e) =>{
      e.preventDefault();
      axios.defaults.withCredentials=true;
      try {
        const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/auth/login",{username,password});
        console.log(res);
        if(res.data.status){
          navigate('/home');
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  
    return (
      <div className='sign-up-container'>
        <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Login</h2>
          <label htmlFor='username'>Username:</label>
          <input type='text' placeholder='Enter Username' onChange={(e)=>setusername(e.target.value)}/>
  
          <label htmlFor='password'>Password:</label>
          <input type='password' placeholder='Enter password' onChange={(e)=>setpassword(e.target.value)}/>
          <button type='submit'>Login</button>
          <p><Link to="/forgotpassword">Forgot Password</Link></p>
        </form>
      </div>
    )
}

export default Login;