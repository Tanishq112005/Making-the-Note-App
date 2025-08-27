import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import './styles/App.css';
import './index.css'
const App: React.FC = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
};

export default App;