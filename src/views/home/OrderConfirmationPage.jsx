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
        const response = await axios.get("https://34.201.92.59/orders/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        setOrder(response.data[0]); // Assume we want to show the latest order
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

  return (
    <>
      <LayoutComponent>
        <div className="min-h-screen bg-gray-900 flex justify-center items-center px-6 py-8">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Order Confirmation
            </h2>
            {order ? (
              <div>
                <h3 className="text-lg font-semibold">Order Details:</h3>
                <ul>
                  <li>Order ID: {order._id}</li>
                  <li>Status: {order.status}</li>
                  <li>Total: ${order.total.toFixed(2)}</li>
                  <li>
                    Payment Method: {order.paymentDetails.paymentMethodId}
                  </li>
                  <li>
                    Card Last Four Digits:{" "}
                    {order.paymentDetails.cardLastFourDigits}
                  </li>
                  <li>
                    Items Ordered:{" "}
                    {order.items.map((item) => (
                      <div key={item.product._id}>
                        {item.product.name} - {item.quantity} x $
                        {item.product.price.toFixed(2)}
                      </div>
                    ))}
                  </li>
                </ul>
                <div className="mt-4">
                  <h4 className="text-lg font-semibold">Shipping Address:</h4>
                  <p>
                    {order.customer.street}, {order.customer.city},{" "}
                    {order.customer.country}, {order.customer.zip}
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Go to Home
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
