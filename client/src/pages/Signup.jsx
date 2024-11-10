import React, { useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../App.css'

const Signup = () => {
  const navigate=useNavigate();
  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");
  const [email,setemail]=useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try {
      const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/auth/signup",{username,email,password});
      console.log(res);
      if(res.data.status){
        navigate('/login');
      }
    } catch (error) {
      console.log(error.message);
    }

  }

  return (
    <div className='sign-up'>
      <form className='sign-up-form' onSubmit={handleSubmit}>
      <h2>Signup</h2>
        <label htmlFor='username'>Username:</label>
        <input type='text' placeholder='Enter Username' onChange={(e)=>setusername(e.target.value)}/>

        <label htmlFor='email'>Email:</label>
        <input type='email' autoComplete='off' placeholder='Enter your email' onChange={(e)=>setemail(e.target.value)}/>
      
        <label htmlFor='password'>Password:</label>
        <input type='password' placeholder='Enter password' onChange={(e)=>setpassword(e.target.value)}/>
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
