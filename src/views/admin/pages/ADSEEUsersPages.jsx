import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ADSEEUsersPages = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/users/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
        // Manejar el error aquí
      }
    };

    fetchUsers();
  }, []);

  const getRoleBadgeClass = (roleName) => {
    switch (roleName) {
      case "Admin":
        return "bg-red-500 hover:bg-red-700";
      case "Customer":
        return "bg-green-500 hover:bg-green-700";
      case "Seller":
        return "bg-blue-500 hover:bg-blue-700";
      default:
        return "bg-gray-500 hover:bg-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 flex justify-center items-center px-6 py-8">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Gestión de Usuarios
          </h2>
          <Link
            to="/admin"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Regresar
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-left font-bold">
                <th className="pb-4 pt-6 px-6 bg-blue-100">Usuario</th>
                <th className="pb-4 pt-6 px-6 bg-blue-100">Detalles</th>
                <th className="pb-4 pt-6 px-6 bg-blue-100">Fecha de Creacion</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="p-4">
                    {user.name} {user.lastname}
                  </td>
                  <td className="p-4">
                    Email: {user.email}
                    <br />
                    Teléfono: {user.phone}
                    <br />
                    Dirección: {user.street}, {user.city}, {user.country},{" "}
                    {user.zip}
                    <br />
                    <span
                      className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-white ${getRoleBadgeClass(
                        user.role.roleName
                      )}`}
                    >
                      {user.role.roleName}
                    </span>
                  </td>
                  <td>
                    {user.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {users.length === 0 && (
          <div className="text-center py-4">No se encontraron usuarios.</div>
        )}
      </div>
    </div>
  );
};

export default ADSEEUsersPages;
