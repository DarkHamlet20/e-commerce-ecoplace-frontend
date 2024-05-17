import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken, selectCurrentRole } from '../auth/AuthSlice';

const ProtectedRoute = ({ children, roles, redirectPath = '/unauthorized' }) => {
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);

  if (!token) {
    return <Navigate to='/login' />; // Redirigir a la página de inicio de sesión si no hay token
  } else if (roles && !roles.includes(role)) {
    return <Navigate to={redirectPath} />; // Redirigir si el rol no está permitido
  }
  return children;
};

export default ProtectedRoute;
