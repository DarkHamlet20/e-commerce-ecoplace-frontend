import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import AdminFooterComponent from "../components/AdminFooterComponent";

const AdminDashboardPage = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem('auth_token');
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:3000/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error('Error obteniendo datos del usuario:', error));
    }
  }, [token]);

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
