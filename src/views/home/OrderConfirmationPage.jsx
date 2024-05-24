import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LayoutComponent from "../../layout/LayoutMain";

const OrderConfirmationPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get("http://34.201.92.59:3000/orders/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        if (response.data.length > 0) {
          setOrder(response.data[0]); // Assume we want to show the latest order
        } else {
          setError("No orders found");
        }
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch order details");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const calculateTotal = () => {
    return order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  };

  return (
    <>
      <LayoutComponent>
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6 py-8">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Confirmación de Orden
            </h2>
            {order ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">Detalles de la Orden:</h3>
                  <div className="border-t border-gray-300"></div>
                  <div className="flex flex-col md:flex-row justify-between">
                    <span><strong>ID de Orden:</strong> {order._id}</span>
                    <span><strong>Estado:</strong> {order.status}</span>
                    <span><strong>Total:</strong> ${order.total.toFixed(2)}</span>
                    <span><strong>Método de Pago:</strong> {order.paymentDetails.paymentMethodId}</span>
                    <span><strong>Últimos Cuatro Dígitos de la Tarjeta:</strong> {order.paymentDetails.cardLastFourDigits}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">Productos Comprados:</h3>
                  <div className="border-t border-gray-300"></div>
                  {order.items.map((item) => (
                    <div key={item.product._id} className="flex flex-col md:flex-row justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-md" />
                        <div>
                          <h4 className="text-lg font-semibold">{item.product.name}</h4>
                          <p className="text-sm text-gray-600">Vendedor: {item.product?.seller?.name} {item.product?.seller?.lastname}</p>
                          <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-lg font-semibold">${item.product.price.toFixed(2)} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">Dirección de Envío:</h3>
                  <div className="border-t border-gray-300"></div>
                  <p className="text-gray-600">
                    {order.customer.street}, {order.customer.city}, {order.customer.country}, {order.customer.zip}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-gray-700">Fecha de Compra:</h3>
                  <div className="border-t border-gray-300"></div>
                  <p className="text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="mt-6 text-center">
                  <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Volver a la Página Principal
                  </Link>
                </div>
              </div>
            ) : (
              <div>No order details available.</div>
            )}
          </div>
        </div>
      </LayoutComponent>
    </>
  );
};

export default OrderConfirmationPage;
