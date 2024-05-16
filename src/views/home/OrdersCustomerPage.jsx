import React, { useState, useEffect } from "react";
import axios from "axios";
import LayoutComponent from "../../layout/LayoutMain";

const OrdersCustomerPage = () => {
  const [orders, setOrders] = useState([]);
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

  if (loading) {
    return <div className="text-center text-xl py-10">Cargando órdenes...</div>;
  }

  return (
    <>
      <LayoutComponent>
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Mis Órdenes</h2>
          {orders.length === 0 ? (
            <p>No tienes órdenes.</p>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="border p-4 mb-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <h3 className="text-xl font-semibold">Orden #{order._id}</h3>
                  <p>Estado: {order.status}</p>
                </div>
                <div className="border-b pb-2 mb-2">
                  <h4 className="text-lg font-medium">Cliente</h4>
                  <p>
                    {order.customer.name} {order.customer.lastname}
                  </p>
                  <p>
                    {order.customer.street}, {order.customer.city},{" "}
                    {order.customer.country} - {order.customer.zip}
                  </p>
                </div>
                <div className="border-b pb-2 mb-2">
                  <h4 className="text-lg font-medium">Detalles de Pago</h4>
                  <p>Método de Pago: {order.paymentDetails.paymentMethodId}</p>
                  <p>
                    Últimos 4 dígitos: {order.paymentDetails.cardLastFourDigits}
                  </p>
                  <p>
                    Nombre del Titular: {order.paymentDetails.cardHolderName}
                  </p>
                  <p>
                    Fecha de Expiración:{" "}
                    {order.paymentDetails.cardExpirationDate}
                  </p>
                  <p>Monto Pagado: ${order.paymentDetails.amountPaid}</p>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Items</h4>
                  <ul>
                    {order.items.map((item) => (
                      <li
                        key={item.product._id}
                        className="border-b py-2 flex justify-between"
                      >
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
                            <p>
                              Categorías:{" "}
                              {item.product.categories
                                .map((cat) => cat.name)
                                .join(", ")}
                            </p>
                            <p>
                              Vendedor: {item.product.seller.name}{" "}
                              {item.product.seller.lastname}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p>Precio: ${item.product.price}</p>
                          <p>Cantidad: {item.quantity}</p>
                          <p>Subtotal: ${item.quantity * item.product.price}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="text-right font-semibold mt-2">
                    Total: ${order.paymentDetails.amountPaid}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </LayoutComponent>
    </>
  );
};

export default OrdersCustomerPage;
