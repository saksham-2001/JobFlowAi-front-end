// src/pages/SignupPage.js
import {useState, React} from 'react';
import './Auth.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const SignupPage = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post("http://localhost:3001/auth/signup", { name, email, password })
      .then(result => {console.log(result)
      navigate("/login")
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input type="String" placeholder="Full Name" onChange={(e)=>{setName(e.target.value)}}/>
        <label>Email</label>
        <input type="email" placeholder="Enter your email" onChange={(e)=>{setEmail(e.target.value)}} />
        <label>Password</label>
        <input type="password" placeholder="Create a password" onChange={(e)=>{setPassword(e.target.value)}}/>
        
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
};

export default SignupPage;
