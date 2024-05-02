// SuccessPage.jsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LayoutComponent from "../../layout/LayoutMain";
import { CheckCircleIcon } from "@heroicons/react/outline";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    if (sessionId) {
      createOrderFromCart(sessionId);
    }
  }, [location]);

  const createOrderFromCart = async (sessionId) => {
    try {
      // Verificar la sesión de pago con tu backend
      const { data: session } = await axios.get(
        `http://54.204.138.33:3000/orders/checkout-session/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      if (session.payment_status === "paid") {
        // Llamada al backend para crear la orden
        await axios.post(
          "http://54.204.138.33:3000/orders",
          {
            sessionId: sessionId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );

        // Redirigir al usuario a una página de confirmación de la orden, o manejar como desees
        navigate("/success");
      } else {
        // Manejar el caso de pago no exitoso
        console.log("El pago no fue completado.");
        navigate("/cart"); // o donde quieras llevar al usuario
      }
    } catch (error) {
      console.error("Error en el proceso de pago:", error);
      navigate("/cancel"); // o donde quieras llevar al usuario en caso de error
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <CheckCircleIcon className="w-16 h-16 text-green-500" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Pago completado con éxito
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Tu pago ha sido procesado con éxito. Estamos preparando tu orden.
      </p>
      <button
        className="mt-6 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:text-sm"
        onClick={() => navigate("/order-confirmation")}
      >
        Ver detalles de la orden
      </button>
    </div>
  );
};

export default SuccessPage;
