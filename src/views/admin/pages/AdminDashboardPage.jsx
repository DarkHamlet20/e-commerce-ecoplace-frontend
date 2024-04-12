import React, { useEffect, useState } from 'react';
import AdminDashboard from '../components/AdminDashboard';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const AdminDashboardPages = () => {
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => {
          console.error("There was an error with the request:", error);
          // Optionally, you can handle errors here or show a message to the user
        });
    }
  }, [token]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        console.error("No se encontro el token de autenticacion.");
      }
      await axios.post(
        "http://localhost:3000/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("auth_token");
      localStorage.removeItem("userRole");
      // Si la petición es exitosa, elimina el token de localStorage y llama a onLogout
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar cualquier error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  };
  

  const [show, setShow] = useState(false);
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminDashboard />
      <div>
      <nav className='flex justify-end p-6 absolute right-0'>
      <div>
      <button
                onClick={() => setShow(!show)}
                type="button"
                className="flex text-sm bg-gray-600 text-white rounded-full md:me-0 focus:ring-4 focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <span className="sr-only">Open user menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

              </button>
      <div
              className={`"z-50 top-16 right-1 absolute my-4 text-base list-none divide-y  rounded-lg shadow bg-gray-700 divide-gray-600 " id="user-dropdown" ${show ? "block" : "hidden"
                }`}
            >

              <div className="px-4 py-3">
                <span className="block text-sm text-white">
                  {userData.name} {userData.lastname}
                </span>
                <span className="block text-sm truncate text-gray-400">
                  {userData.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <NavLink
                    to="/login"
                    onClick={() => handleLogout()}
                    className="block px-4 py-2 text-sm   hover:bg-gray-600 text-gray-200 hover:text-white"
                  >
                    Sign out
                  </NavLink>
                </li>
              </ul>
            </div>
      </div>
      </nav>
      
      {/* Aquí irá el contenido del dashboard */}
      <div className="p-5 h-3/4 items-center flex">
        <h1 className="text-3xl font-semibold">Bienvenido al Dashboard de Administración</h1>
        {/* Resto del contenido del dashboard */}
      </div>
      </div>
    </div>
  );
};

export default AdminDashboardPages;
