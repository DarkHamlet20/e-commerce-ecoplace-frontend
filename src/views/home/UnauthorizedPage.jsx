import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentRole } from '../../auth/AuthSlice';
import logo from '../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp';

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const role = useSelector(selectCurrentRole);

  const handleRedirect = () => {
    if (!token) {
      navigate("/login");
    } else {
      switch (role) {
        case "Admin":
          navigate("/admin");
          break;
        case "Seller":
          navigate("/seller");
          break;
        case "Customer":
          navigate("/");
          break;
        default:
          navigate("/login");
          break;
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="container max-w-md text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <img src={logo} alt="EcoPlace Logo" className="mx-auto mb-4 w-32" />
        <h1 className="text-8xl font-bold text-red-600 dark:text-red-400">
          403
        </h1>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          Acceso denegado.
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Parece que no tienes permiso para acceder a esta página.
        </p>
        <button
          onClick={handleRedirect}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;

