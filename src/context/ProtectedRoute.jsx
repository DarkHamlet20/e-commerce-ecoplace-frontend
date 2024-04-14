import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentRole } from '../auth/AuthSlice'

const ProtectedRoute = ({ children, roles, redirectPath = '/unauthorized' }) => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);

  if (!token) {
    return children;
  } else if (roles && !roles.includes(role)) {
    return <Navigate to={redirectPath} />;
  }
  return children;
};

export default ProtectedRoute;
