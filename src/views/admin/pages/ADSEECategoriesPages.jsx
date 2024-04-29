import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import SearchBarComponent from '../../../common/SearchbarComponent';
import PaginationComponent from '../../../common/PaginationComponent';
import AdminFooterComponent from "../components/AdminFooterComponent";

const ADSEECategoriesPages = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(6);
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  return (
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}>
      <div className="d-flex min-vh-100">
        <AdminSidebar />
        <div className="flex-grow-1">
          <AdminNavComponent />
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-dark">Gestión de Categorías</h2>
              <div>
                <Link
                  to="/admin"
                  className="btn btn-secondary me-2"
                >
                  Regresar
                </Link>
                <Link
                  to="/admin/categories/add"
                  className="btn btn-primary"
                >
                  Agregar Categoría
                </Link>
              </div>
            </div>
            <SearchBarComponent
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Categoría</th>
                    <th scope="col" className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.length > 0 ? (
                    currentCategories.map((category) => (
                      <tr key={category._id}>
                        <td>{category.categoryName}</td>
                        <td className="text-end">
                          <Link
                            to={`/admin/categories/edit/${category._id}`}
                            className="btn btn-warning me-2"
                          >
                            Actualizar
                          </Link>
                          <Link
                            to={`/admin/categories/delete/${category._id}`}
                            className="btn btn-danger"
                          >
                            Eliminar
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">No se encontraron categorías.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADSEECategoriesPages;
