import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from "@heroicons/react/solid";
import logo from "../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp";

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 py-12 px-4 sm:px-6 lg:px-8">
      <img src={logo} alt="EcoPlace Logo" className="w-24 h-24 mb-4" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <XCircleIcon className="w-16 h-16 text-red-500 mx-auto" />
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Pago Cancelado
        </h2>
        <p className="mt-2 text-gray-600">
          Parece que has cancelado el proceso de pago. ¿Te gustaría volver a
          intentarlo o seguir explorando?
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            className="w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            onClick={() => navigate("/")}
          >
            Continuar Comprando
          </button>
          <button
            className="w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
            onClick={() => navigate("/cart")} // Asume que tienes una ruta /cart para volver al carrito
          >
            Volver al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
