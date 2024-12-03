
import { useState, React, useEffect } from 'react';
import './Auth.css';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  
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
    axios.post("http://localhost:3001/auth/signup", { name, email, password})
      .then(result => {
        if (result.data.success == false) {
          alert("You are an existing user. Please Login");
          navigate("/login");
        }
        else {
          alert("Signed up Successfuly. Please Login");
          navigate("/login");
        }



      })
      .catch(err => console.log(err))
  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="String" placeholder="Full Name" onChange={(e) => { setName(e.target.value) }} />
        <label>Email</label>
        <input type="email" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
        <label>Password</label>
        <input type="password" placeholder="Create a password" onChange={(e) => { setPassword(e.target.value) }} />

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignupPage;
