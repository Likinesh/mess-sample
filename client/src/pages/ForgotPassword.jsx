import React,{useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import '../App.css'


const ForgotPassword = () => {
  const navigate=useNavigate();
    const [username,setusername]=useState("")
    
    const handleSubmit = async(e) =>{
      e.preventDefault();
      axios.defaults.withCredentials=true;
      try {
        const res=await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/auth/forgotpassword",{username});
        console.log(res);
        if(res.data.status){
          //Convert to toast
          alert("check your Email!");
          navigate('/');
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
        <h2>Forgot Password</h2>
          <label htmlFor='username'>username:</label>
          <input type='text' placeholder='Enter username' onChange={(e)=>setusername(e.target.value)}/>
  
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
