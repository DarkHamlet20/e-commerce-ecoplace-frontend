import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import AdminSearchBarComponent from "../components/AdminSearchBarComponent";
import AdminPaginationComponent from "../components/AdminPaginationComponent";
import AdminFooterComponent from "../components/AdminFooterComponent";
import 'tailwindcss/tailwind.css';

const ADSEEUsersPages = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://34.201.92.59:3000/users/admin/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.roleName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadgeClass = (roleName) => {
    switch (roleName) {
      case "Admin":
        return "bg-red-500";
      case "Customer":
        return "bg-green-500";
      case "Seller":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <AdminNavComponent />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
              <Link to="/admin" className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition duration-300">
                Regresar
              </Link>
            </div>
            <div className="mb-4">
              <AdminSearchBarComponent
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar usuarios..."
              />
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Usuario</th>
                    <th className="py-2">Detalles</th>
                    <th className="py-2">Fecha de Creación</th>
                    <th className="py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user._id}>
                        <td className="border px-4 py-2">{user.name} {user.lastname}</td>
                        <td className="border px-4 py-2">
                          <div>Email: {user.email}</div>
                          <div>Teléfono: {user.phone}</div>
                          <div>Dirección: {user.street}, {user.city}, {user.country}, {user.zip}</div>
                          <span className={`inline-block px-2 py-1 text-xs font-semibold text-white rounded ${getRoleBadgeClass(user.role.roleName)}`}>
                            {user.role.roleName}
                          </span>
                        </td>
                        <td className="border px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td className="border px-4 py-2">
                          <Link to={`/admin/users/edit/${user._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300">
                            Editar
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4">No se encontraron usuarios.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <AdminPaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
              onPageChange={paginate}
            />
          </div>
        </main>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default ADSEEUsersPages;
