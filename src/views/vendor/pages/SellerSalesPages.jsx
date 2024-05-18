import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SellerNavComponent from '../components/SellerNavComponent';
import SellerSidebarComponent from '../components/SellerSidebarComponent';
import PaginationComponent from '../../../common/PaginationComponent';
import SearchBarComponent from '../../../common/SearchbarComponent';
import SellerFooterComponent from '../components/SellerFooterComponent';
import '../styles/SellerSeeSales.css';

const SellerSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [salesPerPage] = useState(10);
  const token = localStorage.getItem('auth_token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://34.201.92.59:3000/sales/seller', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSales(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
        setLoading(false);
      }
    };

    fetchSales();
  }, [token]);

  const filteredSales = sales.filter((sale) => {
    return sale.items.some((item) => 
      item.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredSales.length / salesPerPage);
  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="seller-sales-page">
      <SellerSidebarComponent />
      <div className="seller-main-content">
        <SellerNavComponent />
        <div className="seller-content">
          <div className="seller-header">
            <h2>Ventas del Vendedor</h2>
            <button className="seller-btn seller-btn-secondary" onClick={() => navigate('/seller')}>
              Regresar
            </button>
          </div>

          <SearchBarComponent
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar productos..."
          />

          {loading ? (
            <div className="seller-loading">Cargando...</div> 
          ) : (
            <div className="seller-table-wrapper">
              <table className="seller-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Categoria</th>
                    <th>Cliente</th>
                    <th>Fecha de Venta</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSales.length > 0 ? (
                    currentSales.map((sale) => (
                      <tr key={sale._id}>
                        <td>
                          <div className="seller-product-info">
                            <img
                              src={sale.items[0].product?.images[0]}
                              className="seller-product-image"
                              alt={sale.items[0].product?.name}
                            />
                            <div>
                              <span>{sale.items[0].product?.name}</span>
                              <span>{sale.items[0].product?.brand}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          {sale.items[0].product?.categories[0].categoryName}
                        </td>
                        <td>
                          {sale.customer.name} {sale.customer.lastname}
                        </td>
                        <td>{new Date(sale.createdAt).toLocaleDateString()}</td>
                        <td>${sale.items[0].product?.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="seller-no-sales">No se encontraron ventas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          )}
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SellerSalesPage;
