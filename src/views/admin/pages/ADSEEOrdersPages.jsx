import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBarComponent from "../components/SearchbarComponent";
import PaginationComponent from "../components/PaginationComponent";
import axios from "axios";

const ADSEEOrdersPages = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/orders/all", // Asegúrate de ajustar la URL según tu configuración
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
        // Manejar el error aquí
      }
    };

    fetchOrders();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    `${order.customer?.name} ${order.customer?.lastname}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-blue-900 flex justify-center items-center px-6 py-8">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Lista de Órdenes
          </h2>
          <Link
            to="/admin"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Regresar
          </Link>
        </div>
        <div className="overflow-x-auto">
          <SearchBarComponent
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-left font-bold">
                <th className="pb-4 pt-6 px-6 bg-blue-100">Cliente</th>
                <th className="pb-4 pt-6 px-6 bg-blue-100">Estado</th>
                <th className="pb-4 pt-6 px-6 bg-blue-100">Productos</th>
                <th className="pb-4 pt-6 px-6 bg-blue-100">
                  Fecha de Creación
                </th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="p-4">
                    {order.customer
                      ? `${order.customer.name} ${order.customer.lastname}`
                      : "Cliente no disponible"}
                  </td>
                  <td className="p-4">{order.status}</td>
                  <td className="p-4">
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          <p>
                            {item.product
                              ? item.product.name
                              : "Producto no disponible"}
                          </p>
                          <p>
                            Precio:{" "}
                            {item.product
                              ? item.product.price
                              : "No disponible"}
                          </p>
                          <p>Cantidad: {item.quantity}</p>
                          <p>Total: {item.quantity * item.product?.price}</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={Math.ceil(filteredOrders.length / ordersPerPage)}
          onPageChange={paginate}
        />
        {filteredOrders.length === 0 && (
          <div className="text-center py-4">No se encontraron órdenes.</div>
        )}
      </div>
    </div>
  );
};

export default ADSEEOrdersPages;
