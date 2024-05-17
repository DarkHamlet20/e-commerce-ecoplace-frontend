import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayoutComponent from "../../layout/LayoutMain";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://34.201.92.59:3000/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
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
    <LayoutComponent>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Detalles de la Orden</h2>
        {order ? (
          <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-600">
                <p>Order ID: {order._id}</p>
                <p>Estatus: {order.status}</p>
                <p>Total: ${order.total.toFixed(2)}</p>
              </div>
            </div>
            <div className="border-t pt-2 space-y-2">
              <h3 className="text-xl font-semibold">Articulos Ordenados:</h3>
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <img
                    src={item.product?.images[0] || 'placeholder.jpg'}
                    alt={item.product?.name || 'Product not available'}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div className="flex-grow">
                    <p className="font-medium">{item.product?.name || 'Product not available'}</p>
                    <p className="text-sm text-gray-600">Vendedor: {item.product?.seller?.name || ''} {item.product?.seller?.lastname || ''}</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                    <p className="text-sm text-gray-600">Precio: ${item.product?.price.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">Subtotal: ${(item.quantity * item.product?.price).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-2">
              <h3 className="text-xl font-semibold">Direccion de Envio:</h3>
              <p className="text-sm text-gray-600">{order.customer.street}, {order.customer.city}, {order.customer.country}, {order.customer.zip}</p>
            </div>
            <div className="border-t pt-2">
              <h3 className="text-xl font-semibold">Detalles de Pago:</h3>
              <p className="text-sm text-gray-600">Metodo de Pago: {order.paymentDetails.paymentMethodId}</p>
              <p className="text-sm text-gray-600">Ultimos Cuatros Digito de la Tarjeta: {order.paymentDetails.cardLastFourDigits}</p>
              <p className="text-sm text-gray-600">Monto Pagado ${order.paymentDetails.amountPaid.toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <div>No hay detalles del pedidos disponibles.</div>
        )}
      </div>
    </LayoutComponent>
  );
};

export default OrderDetailsPage;
