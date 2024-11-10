import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  axios.defaults.withCredentials=true;
  const logout =()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL+"/api/auth/logout")
    .then(res=>{
      if(res.data.status){
        navigate('/');
      }
    })
    .catch(err =>{
      console.log(err);
    })
  }
  return (
    <div>
      <h1>Welcome to Home page</h1>
      <br/>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
