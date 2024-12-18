
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/Loginpage.js';
import SignupPage from './pages/Signuppage.js';
import Homepage from './pages/homepage.js';
import MFASetup from './pages/MFAsetup.js';
import MFAverify from './pages/MFAverify.js';
import ProfilePage from './pages/Profilepage.js';
import './App.css';

function App() {
  return (

    <Router>

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
          <Route path="/mfasetup" element={<MFASetup />} />
          <Route path="/mfaverify" element={<MFAverify />} />
          <Route path ="/profile" element={<ProfilePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
