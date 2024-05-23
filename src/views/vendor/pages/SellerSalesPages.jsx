import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SellerNavComponent from '../components/SellerNavComponent';
import SellerSidebarComponent from '../components/SellerSidebarComponent';
import SellerPaginationComponent from '../components/SellerPaginationComponent';
import SellerSearchBarComponent from '../components/SellerSearchComponent';
import SellerFooterComponent from '../components/SellerFooterComponent';

const SellerSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [salesPerPage] = useState(5);
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

  const isValidSale = (sale) => {
    return sale.items && sale.items.length > 0 && sale.items[0].product && sale.customer;
  };

  const filteredSales = sales.filter((sale) => {
    return (
      isValidSale(sale) &&
      (sale.items.some((item) =>
        item.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product?.categories.some((category) =>
          category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      ) ||
      sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.items.some((item) => item.product?.price.toString().includes(searchTerm)))
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
    <div className="flex min-h-screen bg-gray-100">
      <SellerSidebarComponent />
      <div className="flex-1 flex flex-col">
        <SellerNavComponent />
        <main className="flex-1 p-6 bg-white shadow-md rounded-lg">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Ventas del Vendedor</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => navigate('/seller')}
            >
              Regresar
            </button>
          </div>

          <SellerSearchBarComponent
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar por producto, cliente, categoría o precio..."
          />

          {loading ? (
            <div className="text-center text-gray-500">Cargando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">Producto</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">Imagen</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">Categoría</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">Cliente</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">Fecha de Venta</th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-sm font-medium text-gray-500">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSales.length > 0 ? (
                    currentSales.map((sale) => (
                      <tr key={sale._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-800">{sale.items[0].product?.name}</span>
                            <span className="text-gray-500">{sale.items[0].product?.brand}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          <img
                            src={sale.items[0].product?.images[0]}
                            className="w-16 h-16 object-cover rounded"
                            alt={sale.items[0].product?.name}
                          />
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          {sale.items[0].product?.categories.map((cat) => cat.categoryName).join(', ')}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          {sale.customer.name} {sale.customer.lastname}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          {new Date(sale.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 border-b border-gray-200">
                          ${sale.items[0].product?.price}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 border-b border-gray-200 text-center text-gray-500">No se encontraron ventas.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <SellerPaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={paginate}
            />
          )}
        </main>
        <SellerFooterComponent />
      </div>
    </div>
  );
};

export default SellerSalesPage;
