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

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const customerName = `${order.customer?.name} ${order.customer?.lastname}`.toLowerCase();
    const orderDate = new Date(order.createdAt).toLocaleDateString().toLowerCase();
    const paymentAmount = order.paymentDetails.amountPaid.toString();
    
    const matchItems = order.items.some(item => {
      const productName = item.product?.name?.toLowerCase() || "";
      const productBrand = item.product?.brand?.toLowerCase() || "";
      const productCategories = item.product?.categories?.map(cat => cat.categoryName?.toLowerCase()).join(", ") || "";
      const sellerName = `${item.product?.seller?.name || ""} ${item.product?.seller?.lastname || ""}`.toLowerCase();

      return productName.includes(term) ||
             productBrand.includes(term) ||
             productCategories.includes(term) ||
             sellerName.includes(term);
    });

    return customerName.includes(term) ||
           orderDate.includes(term) ||
           paymentAmount.includes(term) ||
           matchItems;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  if (loading) {
    return <div className="text-center text-xl py-10">Cargando órdenes...</div>;
  }

  return (
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
              <table className="min-w-full bg-white border rounded-lg overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gray-800 text-white text-left">
                    <th className="px-6 py-3">Cliente</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3">Productos</th>
                    <th className="px-6 py-3">Fecha de Creación</th>
                    <th className="px-6 py-3">Monto Pagado</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) =>
                    order.items.map((item, index) => (
                      <tr key={`${order._id}-${index}`} className="border-t">
                        {index === 0 && (
                          <td rowSpan={order.items.length} className="border px-6 py-4 whitespace-nowrap">
                            {order.customer ? `${order.customer.name} ${order.customer.lastname}` : "Cliente no disponible"}
                          </td>
                        )}
                        {index === 0 && (
                          <td rowSpan={order.items.length} className="border px-6 py-4 whitespace-nowrap">{order.status}</td>
                        )}
                        <td className="border px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={item.product?.images[0] || 'placeholder.jpg'}
                              alt={item.product?.name || 'Producto no disponible'}
                              className="w-16 h-16 object-cover rounded mr-4"
                            />
                            <div>
                              <p className="font-medium">{item.product?.name || 'Producto no disponible'}</p>
                              <p>Descripción: {item.product?.description || 'No disponible'}</p>
                              <p>Marca: {item.product?.brand || 'No disponible'}</p>
                              <p>Categorías: {item.product?.categories?.map((cat) => cat.categoryName).join(", ") || 'No disponible'}</p>
                              <p>Vendedor: {item.product?.seller?.name || ''} {item.product?.seller?.lastname || ''}</p>
                              <p>Precio: ${item.product?.price || '0'}</p>
                              <p>Cantidad: {item.quantity}</p>
                              <p>Subtotal: ${item.quantity * (item.product?.price || 0)}</p>
                            </div>
                          </div>
                        </td>
                        {index === 0 && (
                          <td rowSpan={order.items.length} className="border px-6 py-4 whitespace-nowrap">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                        )}
                        {index === 0 && (
                          <td rowSpan={order.items.length} className="border px-6 py-4 whitespace-nowrap">
                            ${order.paymentDetails.amountPaid}
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                  {currentOrders.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center border px-6 py-4">No se encontraron órdenes.</td>
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
  );
};

export default OrdersCustomerPage;
