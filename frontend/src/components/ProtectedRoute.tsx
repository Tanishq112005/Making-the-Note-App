import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../app/store';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;