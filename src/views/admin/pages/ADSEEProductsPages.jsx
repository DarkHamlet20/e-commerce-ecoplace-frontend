import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import SearchBarComponent from '../../../common/SearchbarComponent';
import PaginationComponent from '../../../common/PaginationComponent';
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminSeeProducts.css';

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
      const response = await axios.get('http://34.201.92.59:3000/products', {
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
    <div className="products-page products-root">
      <div className="products-content-container">
        <AdminSidebar />
        <div className="products-main-content">
          <AdminNavComponent />
          <div className="products-content-wrapper">
            <div className="products-header">
              <Link to="/admin" className="products-btn products-btn-secondary">Regresar</Link>
              <h2 className="products-title">Gestión de Productos</h2>
              <Link to="/admin/products/add" className="products-btn products-btn-primary">Agregar Producto</Link>
            </div>
            <div className="products-search-bar-container">
              <SearchBarComponent
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar productos..."
              />
            </div>
            <div className="products-table-responsive">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <div className="product-info">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="product-image"
                            />
                            {product.name}
                          </div>
                        </td>
                        <td>${product.price}</td>
                        <td>{product.categories.map((cat) => cat.categoryName).join(', ')}</td>
                        <td>{product.countInStock}</td>
                        <td>
                          <Link to={`/admin/products/edit/${product._id}`} className="products-btn products-btn-warning">Actualizar</Link>
                          <Link to={`/admin/products/delete/${product._id}`} className="products-btn products-btn-danger">Eliminar</Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="products-text-center">No se encontraron productos.</td>
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

export default ADSEEProductsPages;
