// NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500 py-12 px-4 sm:px-6 lg:px-8">
      <img src={logo} alt="EcoPlace Logo" className="w-24 h-24 mb-4" />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-8xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-2xl font-semibold text-gray-700">
          Página no encontrada.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          La página que estás buscando no existe.
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
