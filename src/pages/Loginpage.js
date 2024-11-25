
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Auth.css';

const LoginPage = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
 

  useEffect(() => {
    axios.get("http://localhost:3001/auth/isauth",{withCredentials: true})
      .then(result => {
        if (result.data.success) {
          alert("you are in an existing session.");
          navigate("/home");
        }
      })
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/auth/login", { email, password }, { withCredentials: true })
      .then(result => {
        console.log(result.data);
        if (result.data.success) {
          
          navigate("/home")
          console.log(result.data.message);
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
