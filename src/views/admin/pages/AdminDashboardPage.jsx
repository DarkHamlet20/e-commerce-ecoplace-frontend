import React from 'react';
import AdminDashboard from '../components/AdminDashboard';

const AdminDashboardPages = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminDashboard />
      {/* Aquí irá el contenido del dashboard */}
      <div className="flex-grow p-5">
        <h1 className="text-3xl font-semibold">Bienvenido al Dashboard de Administración</h1>
        {/* Resto del contenido del dashboard */}
      </div>
    </div>
  );
};

export default AdminDashboardPages;
