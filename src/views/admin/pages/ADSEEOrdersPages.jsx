import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import AdminPaginationComponent from "../components/AdminPaginationComponent";
import AdminSearchBarComponent from "../components/AdminSearchBarComponent";
import AdminFooterComponent from "../components/AdminFooterComponent";

const ADSEEOrdersPages = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://34.201.92.59:3000/orders/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(); // Llamar para obtener órdenes
  }, []); // Ejecutar al montar el componente

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Almacenar el término de búsqueda
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt).toLocaleDateString();
    const orderTotal = order.items.reduce((total, item) => total + (item.product?.price || 0) * item.quantity, 0);
    return (
      (order.customer && `${order.customer.name} ${order.customer.lastname}`.toLowerCase().includes(searchTerm.toLowerCase())) ||
      orderDate.includes(searchTerm) ||
      orderTotal.toString().includes(searchTerm) ||
      order.items.some(item => item.product && item.product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow flex flex-col">
        <AdminNavComponent />
        <div className="flex-grow p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Lista de Órdenes</h2>
              <div className="w-full max-w-md">
                <AdminSearchBarComponent
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Buscar órdenes..."
                  className="orders-search"
                />
              </div>
              <Link to="/admin" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Regresar
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {currentOrders.map((order) => (
                <div key={order._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Cliente: {order.customer ? `${order.customer.name} ${order.customer.lastname}` : "Cliente no disponible"}</h3>
                      <p className="text-gray-600">Estado: {order.status}</p>
                      <p className="text-gray-600">Fecha de Creación: {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Link to={`/admin/orders/view/${order._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                        <div>
                          <p className="font-medium">Producto: {item.product?.name || "Producto no disponible"}</p>
                          <p className="text-gray-600">Cantidad: {item.quantity}</p>
                          <p className="text-gray-600">Precio: ${item.product?.price || "No disponible"}</p>
                          <p className="text-gray-600">Total: ${item.quantity * item.product?.price || "0"}</p>
                        </div>
                        {item.product?.images && (
                          <img
                            src={item.product.images[0]}
                            alt={item.product?.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {currentOrders.length === 0 && (
                <div className="text-center text-gray-600">No se encontraron órdenes.</div>
              )}
            </div>
            <div className="mt-6">
              <AdminPaginationComponent
                currentPage={currentPage}
                totalPages={Math.ceil(filteredOrders.length / ordersPerPage)}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
              />
            </div>
          </div>
        </div>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default ADSEEOrdersPages;
