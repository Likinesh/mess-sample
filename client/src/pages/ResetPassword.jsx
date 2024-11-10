import React,{useState} from 'react'
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import '../App.css'

const ResetPassword = () => {
    const navigate=useNavigate();
    const [password,setpassword]=useState("");
    const {token}=useParams();
    
    const handleSubmit = async(e) =>{
      e.preventDefault();
      axios.defaults.withCredentials=true;
      try {
        const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/auth/resetpassword/"+token,{password});
        console.log(res);
        if(res.data.status){
          navigate('/login');
        }
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  return (
    <div>
      <div className='sign-up-container'>
        <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
          <label htmlFor='password'>New password:</label>
          <input type='text' placeholder='Enter password' onChange={(e)=>setpassword(e.target.value)}/>
  
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
