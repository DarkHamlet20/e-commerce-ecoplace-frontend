import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentRole } from '../auth/AuthSlice'

const ProtectedRoute = ({ children, roles }) => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);

  if (!token) {
    return <Navigate to="/login" />;
  } else if (!roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedRoute;
