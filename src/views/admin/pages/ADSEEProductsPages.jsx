import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import AdminSearchBarComponent from '../components/AdminSearchBarComponent';
import AdminPaginationComponent from '../components/AdminPaginationComponent';
import AdminFooterComponent from '../components/AdminFooterComponent';

const ADSEEProductsPages = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
              <h2 className="text-2xl font-semibold">Gestión de Productos</h2>
              <Link
                to="/admin/products/add"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Agregar Producto
              </Link>
            </div>
            <div className="mb-4">
              <AdminSearchBarComponent
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar productos..."
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Producto</th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Precio</th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Categoría</th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Stock</th>
                    <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 border-b border-gray-300">
                          <div className="flex items-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-10 h-10 object-cover rounded mr-4"
                            />
                            <span>{product.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300">${product.price}</td>
                        <td className="px-6 py-4 border-b border-gray-300">{product.categories.map((cat) => cat.categoryName).join(', ')}</td>
                        <td className="px-6 py-4 border-b border-gray-300">{product.countInStock}</td>
                        <td className="px-6 py-4 border-b border-gray-300">
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mr-2"
                          >
                            Actualizar
                          </Link>
                          <Link
                            to={`/admin/products/delete/${product._id}`}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Eliminar
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 border-b border-gray-300 text-center text-gray-500">
                        No se encontraron productos.
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

export default ADSEEProductsPages;
