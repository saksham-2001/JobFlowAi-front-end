
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/Loginpage.js';
import SignupPage from './pages/Signuppage.js';
import Homepage from './pages/homepage.js';

import './App.css';

function App() {
  return (

    <Router basename="/JobFlowAi-front-end">

      <div className="App">
        {/* <nav className="navbar">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </nav> */}


        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/home" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
