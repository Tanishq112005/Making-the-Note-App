import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';
import '../styles/App.css';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        NotesApp
      </Link>
      <div className="nav-links">
        {isAuthenticated && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;