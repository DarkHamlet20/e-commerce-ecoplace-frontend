import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import PaginationComponent from "../../../common/PaginationComponent";
import SearchBarComponent from "../../../common/SearchbarComponent"; // Verificar que está importado correctamente
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
          "https://34.201.92.59/orders/all",
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
    <div className="d-flex flex-column" style={{ marginTop: '60px'}}>
      <div className="d-flex min-vh-100">
        <AdminSidebar />
        <div className="flex-grow-1">
          <AdminNavComponent />
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4"> {/* Título y búsqueda */}
              <h2 className="text-dark">Lista de Órdenes</h2>
              <SearchBarComponent
                value={searchTerm} // Término de búsqueda actual
                onChange={handleSearchChange} // Controlador para el cambio de búsqueda
                placeholder="Buscar órdenes..." // Placeholder descriptivo
              />
              <Link to="/admin" className="btn btn-secondary">Regresar</Link>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
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
                    <tr key={order._id}>
                      <td>{order.customer ? `${order.customer.name} ${order.customer.lastname}` : "Cliente no disponible"}</td>
                      <td>{order.status}</td>
                      <td> {/* Múltiples productos */}
                        <div className="d-flex flex-wrap">
                          {order.items.map((item, index) => (
                            <div key={index} className="border p-2 m-2 rounded">
                              <p>Producto: {item.product?.name || "Producto no disponible"}</p>
                              <p>Precio: ${item.product?.price || "No disponible"}</p>
                              <p>Cantidad: {item.quantity}</p>
                              <p>Total: ${item.quantity * item.product?.price || "0"}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
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
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)} // Controlador para paginación
            />            
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADSEEOrdersPages;
