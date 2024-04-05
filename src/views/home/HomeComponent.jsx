// import { useEffect, useState } from 'react';
import axios from 'axios';
import CatalogoComponent from '../../components/CatalogoComponent';
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigate = useNavigate();

  

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.error("No se encontro el token de autenticacion.");
      }
      await axios.post('https://ecoplace.3.us-1.fl0.io/users/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('auth_token');
      // Si la petición es exitosa, elimina el token de localStorage y llama a onLogout
      navigate('/login')
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar cualquier error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <div>
      <CatalogoComponent />
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default HomePage;