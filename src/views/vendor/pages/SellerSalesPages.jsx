import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Spinner, Image } from 'react-bootstrap';
import SellerNavComponent from '../components/SellerNavComponent';
import SellerSidebarComponent from '../components/SellerSidebarComponent';
import PaginationComponent from '../../../common/PaginationComponent';
import SearchBarComponent from '../../../common/SearchbarComponent';
import SellerFooterComponent from '../components/SellerFooterComponent';

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
      setLoading(true); // Indicar que está cargando
      try {
        const response = await axios.get('http://localhost:3000/sales/seller', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSales(response.data);
        setLoading(false); // Indicar que terminó de cargar
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
        setLoading(false);
      }
    };

    fetchSales(); // Obtener ventas al montar el componente
  }, [token]); // Volver a cargar cuando el token cambia

  const filteredSales = sales.filter((sale) => {
    // Buscar productos por nombre
    return sale.items.some((item) => 
      item.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredSales.length / salesPerPage);

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Actualizar el término de búsqueda
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); // Cambiar la página actual
  };

  return (
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}>
      <div className="d-flex min-vh-100">
        <SellerSidebarComponent />
        <div className="flex-grow-1">
          <SellerNavComponent />
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Ventas del Vendedor</h2>
              <button className="btn btn-info" onClick={() => navigate('/seller')}>
                Regresar
              </button>
            </div>

            <SearchBarComponent
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar productos..."
            />

            {loading ? (
              <Spinner animation="border" /> 
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr className="bg-info text-white">
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
                          <div className="d-flex align-items-center">
                            <Image
                              src={sale.items[0].product?.images[0]} // Imagen del producto
                              roundedCircle
                              style={{ height: '40px', width: '40px' }}
                              alt={sale.items.product?.name}
                            />
                            <span className="ms-2">{sale.items[0].product?.name}</span>
                            <span className="ms-2">{sale.items[0].product?.brand}</span>
                          </div>
                        </td>
                        <td>
                          <span className="ms-2">{sale.items[0].product?.categories[0].categoryName}</span>
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
                      <td colSpan="5" className="text-center">No se encontraron ventas.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
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
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SellerSalesPage;
