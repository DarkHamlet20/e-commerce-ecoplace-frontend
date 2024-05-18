import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import PaginationComponent from "../../../common/PaginationComponent";
import SearchBarComponent from "../../../common/SearchbarComponent";
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminOrders.css';

const ADSEEOrdersPages = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/orders/all",
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

  const filteredOrders = orders.filter((order) => 
    `${order.customer?.name} ${order.customer?.lastname} ${order.createdAt}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) // Filtrar por el término de búsqueda
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div className="orders-page-container">
      <div className="orders-content-container">
        <AdminSidebar />
        <div className="orders-main-content">
          <AdminNavComponent />
          <div className="orders-content-wrapper">
            <div className="orders-header">
              <h2 className="orders-title">Lista de Órdenes</h2>
              <SearchBarComponent
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar órdenes..."
                className="orders-search"
              />
              <Link to="/admin" className="orders-btn orders-btn-secondary">Regresar</Link>
            </div>
            <div className="orders-table-responsive">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Estado</th>
                    <th>Productos</th>
                    <th>Fecha de Creación</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    order.items.map((item, index) => (
                      <tr key={`${order._id}-${index}`}>
                        {index === 0 && (
                          <td rowSpan={order.items.length}>
                            {order.customer ? `${order.customer.name} ${order.customer.lastname}` : "Cliente no disponible"}
                          </td>
                        )}
                        {index === 0 && (
                          <td rowSpan={order.items.length}>{order.status}</td>
                        )}
                        <td>
                          <div className="orders-product-details">
                            <div className="orders-product-card">
                              <p>Producto: {item.product?.name || "Producto no disponible"}</p>
                              <p>Precio: ${item.product?.price || "No disponible"}</p>
                              <p>Cantidad: {item.quantity}</p>
                              <p>Total: ${item.quantity * item.product?.price || "0"}</p>
                            </div>
                          </div>
                        </td>
                        {index === 0 && (
                          <td rowSpan={order.items.length}>{new Date(order.createdAt).toLocaleDateString()}</td>
                        )}
                      </tr>
                    ))
                  ))}
                  {currentOrders.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center">No se encontraron órdenes.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(filteredOrders.length / ordersPerPage)}
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />            
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADSEEOrdersPages;
