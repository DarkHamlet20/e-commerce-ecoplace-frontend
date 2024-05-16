import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import SearchBarComponent from "../../../common/SearchbarComponent";
import PaginationComponent from "../../../common/PaginationComponent";
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/SeeUsers.css';

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
        // Manejar el error aquí
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
        return "bg-danger";
      case "Customer":
        return "bg-success";
      case "Seller":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="users-page-container users-root">
      <div className="users-content-container">
        <AdminSidebar />
        <div className="users-main-content">
          <AdminNavComponent />
          <div className="users-content-wrapper">
            <div className="users-header">
              <h2 className="users-title">Gestión de Usuarios</h2>
              <SearchBarComponent
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar usuarios..."
              />
              <Link to="/admin" className="users-btn users-btn-secondary">Regresar</Link>
            </div>
            <div className="users-table-responsive">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Detalles</th>
                    <th>Fecha de Creación</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name} {user.lastname}</td>
                        <td>
                          Email: {user.email}<br />
                          Teléfono: {user.phone}<br />
                          Dirección: {user.street}, {user.city}, {user.country}, {user.zip}<br />
                          <span className={`badge ${getRoleBadgeClass(user.role.roleName)}`}>
                            {user.role.roleName}
                          </span>
                        </td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Link to={`/admin/users/edit/${user._id}`} className="users-btn users-btn-warning">Editar</Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">No se encontraron usuarios.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(filteredUsers.length / usersPerPage)}
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADSEEUsersPages;
