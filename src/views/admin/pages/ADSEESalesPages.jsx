import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import AdminPaginationComponent from "../components/AdminPaginationComponent";
import AdminSearchBarComponent from "../components/AdminSearchBarComponent";
import AdminFooterComponent from "../components/AdminFooterComponent";

const ADSEESalesPages = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage] = useState(5);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          "http://34.201.92.59:3000/sales/admin",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setSales(response.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSales = sales.filter((sale) => {
    const saleDate = new Date(sale.createdAt).toLocaleDateString();
    return (
      (sale.customer && `${sale.customer.name} ${sale.customer.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (sale.items.some(item => item.product && item.product.seller && `${item.product.seller.name} ${item.product.seller.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (sale.items.some(item => item.product && item.product.name.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      saleDate.includes(searchTerm) ||
      sale.items.some(item => item.product && item.product.price.toString().includes(searchTerm))
    );
  });

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <AdminNavComponent />
        <div className="flex-1 p-4">
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Lista de Ventas</h2>
              <div className="flex-1 flex justify-center">
                <AdminSearchBarComponent
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar ventas..."
                />
              </div>
              <Link to="/admin" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Regresar
              </Link>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendedor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productos</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de Venta</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentSales.map((sale) => (
                  <React.Fragment key={sale._id}>
                    {sale.items.map((item, index) => (
                      <tr key={`${sale._id}-${index}`} className={`${index === 0 ? 'border-t-2 border-gray-300' : ''}`}>
                        {index === 0 && (
                          <>
                            <td rowSpan={sale.items.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r-2 border-gray-300">
                              {sale.customer ? `${sale.customer.name} ${sale.customer.lastname}` : "Cliente no disponible"}
                            </td>
                            <td rowSpan={sale.items.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r-2 border-gray-300">
                              {item.product?.seller ? `${item.product.seller.name} ${item.product.seller.lastname}` : "Vendedor no disponible"}
                            </td>
                            <td rowSpan={sale.items.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r-2 border-gray-300">
                              {sale.status}
                            </td>
                          </>
                        )}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <img
                              src={item.product?.images[0] || 'placeholder.jpg'}
                              alt={item.product?.name || 'Producto no disponible'}
                              className="w-10 h-10 object-cover rounded mr-4"
                            />
                            <div>
                              <p className="font-medium">{item.product?.name || 'Producto no disponible'}</p>
                              <p className="text-sm text-gray-600">Precio: ${item.product?.price || '0'}</p>
                              <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                              <p className="text-sm text-gray-600">Total: ${(item.quantity * item.product?.price || 0).toFixed(2)}</p>
                            </div>
                          </div>
                        </td>
                        {index === 0 && (
                          <td rowSpan={sale.items.length} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(sale.createdAt).toLocaleDateString()}
                          </td>
                        )}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
                {currentSales.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                      No se encontraron ventas.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <AdminPaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(filteredSales.length / salesPerPage)}
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
        </div>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default ADSEESalesPages;
