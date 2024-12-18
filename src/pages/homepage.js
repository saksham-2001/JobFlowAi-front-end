import React, { useState, useEffect } from 'react';
import './homepage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';


function App() {
 const[name, setName]= useState('User');
 const[email, setEmail]= useState("");
 const[isMFAregistered, setIsMFAregistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/auth/isauth`,{withCredentials: true})
      .then(result => {
        if (result.data.success) {
          console.log(result);
          setName(result.data.name);
          setEmail(result.data.email);
          console.log(result.data.email);
          setIsMFAregistered(result.data.isregistered);
          
        }
        else{
          console.log(result);
          navigate("/login");
        }
      })
  }, [navigate]);




  


  const handleLogout = () => {
    axios.get(`${API_BASE_URL}/auth/logout`, {withCredentials: true})
    .then(result=>{
   if (result.data.success){
    alert("You have logged out successfully");
    navigate('/login');} 
  }).catch(err=>{console.log(err)})
  };

  const handleProfile =()=>{
    navigate('/profile', {state:{email}});
  }
  
  const handleMFAsetup =() =>{
    navigate('/mfasetup');
  }


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
            
          <li>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </li>
            {(!isMFAregistered) &&(<li>
              <button className="logout-button" onClick={handleMFAsetup}>
                MFAsetup
              </button>
            </li>)}
            <li>
              <button className="logout-button" onClick={handleProfile}>
                Profile
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
