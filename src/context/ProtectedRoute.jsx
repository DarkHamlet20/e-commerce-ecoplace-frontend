import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UnauthorizedPage from '../views/home/UnauthorizedPage';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { token, role } = useAuth();

  if (!token) {
    // Usuario no autenticado
    return <Navigate to="/login" />;
  }

  if (roles.length && !roles.includes(role)) {
    // Usuario no tiene permiso
    return <UnauthorizedPage />;
  }

  // Usuario autenticado y con permiso
  return children;
};

export default ProtectedRoute;
