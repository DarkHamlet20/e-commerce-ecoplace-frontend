import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';

const AdminDashboardPage = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem('auth_token');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/users/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userRole');
      navigate('/login');
    } catch (error) {
      console.error('Error durante el cierre de sesión', error);
    }
  };

  const handleLogoutAllSessions = async () => {
    try {
      await axios.post(
        'http://localhost:3000/users/logout-all',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userRole');
      navigate('/login');
    } catch (error) {
      console.error('Error cerrando todas las sesiones', error);
    }
  };

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:3000/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error('Error obteniendo datos del usuario', error));
    }
  }, [token]);

  return (
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}> {/* Ajuste para el navbar fijo */}
      <div className="d-flex min-vh-100"> {/* Estructura principal */}
        <AdminSidebar />
        <div className="flex-grow-1">
          <AdminNavComponent
            handleLogout={handleLogout}
            handleLogoutAllSessions={handleLogoutAllSessions}
          />
          <div className="container mt-4"> {/* Espacio para el contenido */}
            <h1 className="text-dark">Bienvenido al Dashboard de Administración</h1>
            {/* Aquí irá el contenido del dashboard */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
