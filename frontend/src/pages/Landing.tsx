import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css'; 

const Landing: React.FC = () => {
  return (
    <div className="landing-wrapper">
      <nav className="landing-nav">
        <div className="logo">NotesApp</div>
        <div className="nav-links">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup"  className="btn btn-primary nav-btn">Sign Up</Link>
        </div>
      </nav>
      <main className="hero-section">
        <h1 className="hero-title">
          Capture Your Brilliance. <br /> Organize Your Thoughts.
        </h1>
        <p className="hero-subtitle">
          Turn chaos into clarity, one note at a time. Your personal space to think, create, and achieve.
        </p>
        <Link to="/signup" className="btn btn-primary hero-btn">
          Get Started for Free
        </Link>
      </main>
    </div>
  );
};

export default Landing;