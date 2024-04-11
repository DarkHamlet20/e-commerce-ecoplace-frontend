import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UnauthorizedPage from '../views/home/UnauthorizedPage';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { token, role } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles.length && !roles.includes(role)) {
    return <UnauthorizedPage />;
  }

  return children;
};

export default ProtectedRoute;
