import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/outline";
import logo from "../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp";

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
        `http://34.201.92.59:3000/orders/checkout-session/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      if (session.payment_status === "paid") {
        // Llamada al backend para crear la orden
        await axios.post(
          "http://34.201.92.59:3000/orders",
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 py-12 px-4 sm:px-6 lg:px-8">
      <img src={logo} alt="EcoPlace Logo" className="w-24 h-24 mb-4" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Pago completado con éxito
        </h2>
        <p className="mt-2 text-gray-600">
          Tu pago ha sido procesado con éxito. Estamos preparando tu orden.
        </p>
        <button
          className="mt-6 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => navigate("/order-confirmation")}
        >
          Ver detalles de la orden
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
