import React from "react";
import { useNavigate } from "react-router-dom";
import LayoutComponent from "../../layout/LayoutMain";
import { XCircleIcon } from "@heroicons/react/solid";

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <XCircleIcon className="w-16 h-16 text-red-500" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Pago Cancelado
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Parece que has cancelado el proceso de pago. ¿Te gustaría volver a
        intentarlo o seguir explorando?
      </p>
      <div className="mt-6">
        <button
          className="mr-4 w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
          onClick={() => navigate("/")}
        >
          Continuar Comprando
        </button>
        <button
          className="w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          onClick={() => navigate("/cart")} // Asume que tienes una ruta /checkout para volver al proceso de pago
        >
          Volver al Pago
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
