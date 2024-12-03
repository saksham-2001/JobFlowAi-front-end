import React, { useState, useEffect } from 'react';
import './homepage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const basename ='/JobFlowAi-front-end'

function App() {
 const[name, setName]= useState('User');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/auth/isauth",{withCredentials: true})
      .then(result => {
        if (result.data.success) {
          setName(result.data.name);
          
        }
        else{
          navigate(`${basename}/login`);
        }
      })
  }, [navigate]);


  const handleLogout = () => {
    axios.get("http://localhost:3001/auth/logout", {withCredentials: true})
    .then(result=>{
   if (result.data.success){
    alert("You have logged out successfully");
    navigate(`${basename}/login`);} 
  }).catch(err=>{console.log(err)})
  };

  return (
    <div className="App">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">MyWebsite</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2 className="welcome-message">
          Welcome {name}! 
        </h2>
        <p className="hero-description">
          Your one-stop solution for amazing web experiences.
        </p>
        <button className="cta-button">Get Started</button>
      </section>

      {/* Services Section */}
      <section className="content">
        <h3>Our Services</h3>
        <div className="cards">
          <div className="card">
            <h4>Web Development</h4>
            <p>Building responsive and modern websites.</p>
          </div>
          <div className="card">
            <h4>UI/UX Design</h4>
            <p>Crafting user-friendly and aesthetic interfaces.</p>
          </div>
          <div className="card">
            <h4>Consulting</h4>
            <p>Helping you make informed tech decisions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 MyWebsite. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
