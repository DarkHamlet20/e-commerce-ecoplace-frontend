import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import SearchBarComponent from '../../../common/SearchbarComponent';
import PaginationComponent from '../../../common/PaginationComponent';
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/SeeCategories.css'

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
      const response = await axios.get('http://34.201.92.59:3000/categories', {
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
    <div className="admin-categories-page">
      <AdminSidebar />
      <div className="admin-content">
        <AdminNavComponent />
        <div className="admin-main-content">
          <div className="admin-header">
            <Link to="/admin" className="admin-btn admin-btn-secondary">
              Regresar
            </Link>
            <h2>Gestión de Categorías</h2>
          </div>
          <div className="admin-search-bar-container">
            <SearchBarComponent value={searchTerm} onChange={handleSearchChange} />
          </div>
          <div className="admin-table-responsive">
            <table className="admin-categories-table">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentCategories.length > 0 ? (
                  currentCategories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.categoryName}</td>
                      <td className="text-end">
                        <Link to={`/admin/categories/edit/${category._id}`} className="admin-btn admin-btn-warning">
                          Actualizar
                        </Link>
                        <Link to={`/admin/categories/delete/${category._id}`} className="admin-btn admin-btn-danger">
                          Eliminar
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="admin-text-center">No se encontraron categorías.</td>
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
      <AdminFooterComponent />
    </div>
  );
};

export default ADSEECategoriesPages;