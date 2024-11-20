// src/pages/LoginPage.js
import { React, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Auth.css';


const LoginPage = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate =useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/auth/login", { email, password })
      .then(result => {
      //console.log(result);
        if (result.data.success) {
          navigate("/home")
        } else {
          navigate("/signup")
          alert("You are not registered to this service")

        }

      })
      .catch(err => console.log(err))
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
        <label>Password</label>
        <input type="password" placeholder="Enter your password" onChange={(e) => { setPassword(e.target.value) }} />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default LoginPage;
