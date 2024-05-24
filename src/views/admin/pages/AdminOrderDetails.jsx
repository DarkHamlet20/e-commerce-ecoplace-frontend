import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import AdminFooterComponent from "../components/AdminFooterComponent";

const AdminOrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-grow flex flex-col">
        <AdminNavComponent />
        <div className="flex-grow p-6">
          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Detalles de la Orden</h2>
              <Link
                to="/admin/orders/view"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Regresar
              </Link>
            </div>
            {order ? (
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <div className="text-sm text-gray-600">
                    <p>Order ID: {order._id}</p>
                    <p>Estatus: {order.status}</p>
                    <p>Total: ${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="border-t pt-2 space-y-2">
                  <h3 className="text-xl font-semibold">
                    Articulos Ordenados:
                  </h3>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">
                          Producto:{" "}
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
                          Precio: ${item.product?.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Subtotal: $
                          {(item.quantity * item.product?.price).toFixed(2)}
                        </p>
                      </div>
                      {item.product?.images && (
                        <img
                          src={item.product.images[0]}
                          alt={item.product?.name}
                          className="w-20 h-20 object-cover rounded mr-4"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2">
                  <h3 className="text-xl font-semibold">Direccion de Envio:</h3>
                  <p className="text-sm text-gray-600">
                    {order.customer.street}, {order.customer.city},{" "}
                    {order.customer.country}, {order.customer.zip}
                  </p>
                </div>
                <div className="border-t pt-2">
                  <h3 className="text-xl font-semibold">Detalles de Pago:</h3>
                  <p className="text-sm text-gray-600">
                    Metodo de Pago: {order.paymentDetails.paymentMethodId}
                  </p>
                  <p className="text-sm text-gray-600">
                    Ultimos Cuatros Digito de la Tarjeta:{" "}
                    {order.paymentDetails.cardLastFourDigits}
                  </p>
                  <p className="text-sm text-gray-600">
                    Monto Pagado: ${order.paymentDetails.amountPaid.toFixed(2)}
                  </p>
                </div>
              </div>
            ) : (
              <div>No hay detalles del pedido disponibles.</div>
            )}
          </div>
        </div>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default AdminOrderDetails;
