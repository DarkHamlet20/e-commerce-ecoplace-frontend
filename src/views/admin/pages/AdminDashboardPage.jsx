import React from 'react';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import AdminFooterComponent from "../components/AdminFooterComponent";

const AdminDashboardPage = () => {

  return (
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}> {/* Ajuste para el navbar fijo */}
      <div className="d-flex min-vh-100"> {/* Estructura principal */}
        <AdminSidebar /> {/* Sidebar */}
        <div className="flex-grow-1"> {/* Contenedor principal */}
          <AdminNavComponent /> {/* Navbar con funciones de cierre de sesión */}
          <div className="container mt-4"> {/* Espacio para el contenido */}
            <h1 className="text-dark">Bienvenido al Dashboard de Administración</h1> {/* Mensaje de bienvenida */}
            {/* Aquí irá el contenido del dashboard */}
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default AdminDashboardPage;
