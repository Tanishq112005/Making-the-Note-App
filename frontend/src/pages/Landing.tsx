import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Landing: React.FC = () => {
  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to NotesApp</h1>
      <p>Your personal space to write down thoughts and ideas.</p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/login" style={{ marginRight: '20px', fontSize: '1.2rem' }}>
          Login
        </Link>
        <Link to="/signup" style={{ fontSize: '1.2rem' }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Landing;