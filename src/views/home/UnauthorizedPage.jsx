import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="container max-w-md text-center">
        <h1 className="text-8xl font-bold text-red-600 dark:text-red-400">
          403
        </h1>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          Acceso denegado.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Parece que no tienes permiso para acceder a esta página.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;