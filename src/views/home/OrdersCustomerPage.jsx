import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutComponent from "../../layout/LayoutMain";
import PaginationComponent from "../../common/PaginationComponent";
import SearchBarComponent from "../../common/SearchbarComponent";

const OrdersCustomerPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://34.201.92.59:3000/orders/user/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`, // Asumiendo que el token se almacena en localStorage
            },
          }
        );
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

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

  if (loading) {
    return <div className="text-center text-xl py-10">Cargando órdenes...</div>;
  }

  return (
    <>
      <LayoutComponent>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Mis Órdenes</h2>
        <div className="flex justify-between items-center mb-4">
          <SearchBarComponent
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Buscar órdenes..."
          />
        </div>
        {orders.length === 0 ? (
          <p>No tienes órdenes.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Cliente</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2">Productos</th>
                    <th className="px-4 py-2">Fecha de Creación</th>
                    <th className="px-4 py-2">Monto Pagado</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) =>
                    order.items.map((item, index) => (
                      <tr key={`${order._id}-${index}`}>
                        {index === 0 && (
                          <td rowSpan={order.items.length} className="border px-4 py-2">
                            {order.customer ? `${order.customer.name} ${order.customer.lastname}` : "Cliente no disponible"}
                          </td>
                        )}
                        {index === 0 && (
                          <td rowSpan={order.items.length} className="border px-4 py-2">{order.status}</td>
                        )}
                        <td className="border px-4 py-2">
                          <div className="flex">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover mr-4"
                            />
                            <div>
                              <p className="font-medium">{item.product.name}</p>
                              <p>Descripción: {item.product.description}</p>
                              <p>Marca: {item.product.brand}</p>
                              <p>Categorías: {item.product.categories.map((cat) => cat.categoryName).join(", ")}</p>
                              <p>Vendedor: {item.product.seller.name} {item.product.seller.lastname}</p>
                              <p>Precio: ${item.product.price}</p>
                              <p>Cantidad: {item.quantity}</p>
                              <p>Subtotal: ${item.quantity * item.product.price}</p>
                            </div>
                          </div>
                        </td>
                        {index === 0 && (
                          <td rowSpan={order.items.length} className="border px-4 py-2">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        )}
                        {index === 0 && (
                          <td rowSpan={order.items.length} className="border px-4 py-2">
                            ${order.paymentDetails.amountPaid}
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                  {currentOrders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center border px-4 py-2">No se encontraron órdenes.</td>
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
          </>
        )}
      </div>
    </LayoutComponent>
    </>
  );
};

export default OrdersCustomerPage;
