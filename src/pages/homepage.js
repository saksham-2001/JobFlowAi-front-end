import React from 'react';
import './homepage.css';

function App() {
  return (
    <div className="App">
      <header className="navbar">
        <h1 className="logo">MyWebsite</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <h2>Welcome to MyWebsite</h2>
        <p>Your one-stop solution for amazing web experiences.</p>
        <button className="cta-button">Get Started</button>
      </section>

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

      <footer className="footer">
        <p>© 2024 MyWebsite. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
