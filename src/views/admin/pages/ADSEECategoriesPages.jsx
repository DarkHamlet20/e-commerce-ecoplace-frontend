import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import AdminSearchBarComponent from '../components/AdminSearchBarComponent';
import AdminPaginationComponent from '../components/AdminPaginationComponent';
import AdminFooterComponent from '../components/AdminFooterComponent';

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
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow">
        <AdminNavComponent />
        <div className="p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <Link
                to="/admin"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Regresar
              </Link>
              <h2 className="text-2xl font-semibold">Gestión de Categorías</h2>
              <Link
                to="/admin/categories/add"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Agregar Categoría
              </Link>
            </div>
            <div className="mb-4">
              <AdminSearchBarComponent
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar categorías..."
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Categoría</th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCategories.length > 0 ? (
                    currentCategories.map((category) => (
                      <tr key={category._id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 border-b border-gray-300">{category.categoryName}</td>
                        <td className="px-6 py-4 border-b border-gray-300">
                          <Link
                            to={`/admin/categories/edit/${category._id}`}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                          >
                            Actualizar
                          </Link>
                          <Link
                            to={`/admin/categories/delete/${category._id}`}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Eliminar
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="px-6 py-4 border-b border-gray-300 text-center text-gray-500">
                        No se encontraron categorías.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <AdminPaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default ADSEECategoriesPages;
