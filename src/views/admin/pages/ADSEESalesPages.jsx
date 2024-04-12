import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchBarComponent from '../components/SearchbarComponent';
import PaginationComponent from "../components/PaginationComponent";

const ADSEESalesPages = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage] = useState(5);  

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sales/admin", // Asegúrate de ajustar la URL según tu configuración
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setSales(response.data);
      } catch (error) {
        console.error("Error fetching sales", error);
      }
    };

    fetchSales();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSales = sales.filter((sale) =>
    sale.customer && `${sale.customer.name} ${sale.customer.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  // Cambiar la página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-blue-900 flex justify-center items-center px-6 py-8">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Lista de Ventas
          </h2>
          <Link
            to="/admin"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Regresar
          </Link>
        </div>
        <div className="overflow-x-auto">
        <SearchBarComponent value={searchTerm} onChange={handleSearchChange} placeholder="Buscar ventas..." />
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vendedor
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Detalles del Producto
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Venta
                </th>
              </tr>
            </thead>
            <tbody>
              {currentSales.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-100">
                  <td className="p-4">
                      <div>
                        <p>
                          {sale.customer ? `${sale.customer?.name} ${sale.customer?.lastname}` : 'Cliente no disponible'}
                        </p>
                      </div>
                  </td>
                  <td className="p-4">
                    {sale.items.map((item, index) => (
                      <div key={index}>
                        <p>
                          {item.product?.seller ? `
                          ${item.product?.seller?.name}
                          ${item.product?.seller?.lastname}
                          ` : 'Vendedor no disponible'}
                        </p>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">{sale.status}</td>
                  <td className="p-4">
                    <ul>
                      {sale.items.map((item, index) => (
                        <li key={index}>
                          <p>{item.product?.name}</p>
                          <p>Precio: {item.product?.price}</p>
                          <p>Cantidad: {item.quantity}</p>
                          <p>Total: {item.quantity * item.product?.price}</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(filteredSales.length / salesPerPage)}
          onPageChange={paginate}
        />
        {currentSales.length === 0 && (
          <div className="text-center py-4">No se encontraron ventas.</div>
        )}
      </div>
    </div>
  );
};

export default ADSEESalesPages;
