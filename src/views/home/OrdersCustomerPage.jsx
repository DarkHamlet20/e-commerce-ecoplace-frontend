import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LayoutComponent from "../../layout/LayoutMain";
import PaginationComponent from "../../common/PaginationComponent";
import SearchBarComponent from "../../common/SearchbarComponent";

const OrdersCustomerPage = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3); // Número de órdenes por página
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://34.201.92.59:3000/orders/user/all",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
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
    setSearchTerm(e.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const customerName =
      `${order.customer?.name} ${order.customer?.lastname}`.toLowerCase();
    const orderDate = new Date(order.createdAt)
      .toLocaleDateString()
      .toLowerCase();
    const paymentAmount = order.paymentDetails.amountPaid.toString();

    const matchItems = order.items.some((item) => {
      const productName = item.product?.name?.toLowerCase() || "";
      const productBrand = item.product?.brand?.toLowerCase() || "";
      const productCategories =
        item.product?.categories
          ?.map((cat) => cat.categoryName?.toLowerCase())
          .join(", ") || "";
      const sellerName = `${item.product?.seller?.name || ""} ${
        item.product?.seller?.lastname || ""
      }`.toLowerCase();

      return (
        productName.includes(term) ||
        productBrand.includes(term) ||
        productCategories.includes(term) ||
        sellerName.includes(term)
      );
    });

    return (
      customerName.includes(term) ||
      orderDate.includes(term) ||
      paymentAmount.includes(term) ||
      matchItems
    );
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  if (loading) {
    return <div className="text-center text-xl py-10">Cargando órdenes...</div>;
  }

  return (
    <LayoutComponent>
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto p-4 flex-grow">
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
              <div className="space-y-4">
                {currentOrders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white shadow-md rounded-lg p-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-600">
                        <p>
                          Fecha de Orden:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                          Total de la Orden: ${order.paymentDetails.amountPaid}
                        </p>
                        <p>Número de Orden: {order._id}</p>
                      </div>
                      <Link
                        to={`/order/${order._id}`}
                        className="text-blue-600"
                      >
                        Ver detalles de la orden
                      </Link>
                    </div>
                    <div className="border-t pt-2">
                      {order.items.map((item, index) => (
                        <div
                          key={`${order._id}-${item.product?._id || index}`}
                          className="flex items-center mb-4"
                        >
                          <img
                            src={item.product?.images[0] || "placeholder.jpg"}
                            alt={item.product?.name || "Producto no disponible"}
                            className="w-20 h-20 object-cover rounded mr-4"
                          />
                          <div className="flex-grow">
                            <p className="font-medium">
                              {item.product?.name || "Producto no disponible"}
                            </p>
                            <p className="text-sm text-gray-600">
                              Vendedor: {item.product?.seller?.name || ""}{" "}
                              {item.product?.seller?.lastname || ""}
                            </p>
                            <p className="text-sm text-gray-600">
                              Cantidad: {item.quantity}
                            </p>
                            <p className="text-sm text-gray-600">
                              Subtotal: $
                              {(
                                item.quantity * (item.product?.price || 0)
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
              />
            </>
          )}
        </div>
      </div>
    </LayoutComponent>
  );
};

export default OrdersCustomerPage;
