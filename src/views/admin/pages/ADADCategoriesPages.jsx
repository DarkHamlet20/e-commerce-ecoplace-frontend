import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import AdminFooterComponent from "../components/AdminFooterComponent";
import 'tailwindcss/tailwind.css';

const ADADCategoriesPage = () => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/categories",
        { categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      await showConfirmationAlert(
        "¡Éxito!",
        "Categoría agregada correctamente.",
        "success",
        "Aceptar"
      );
      navigate("/admin/categories/view");
    } catch (error) {
      console.error("Error al agregar la categoría", error);
      showErrorAlert(
        "Error",
        "No se pudo agregar la categoría. Intente nuevamente."
      );
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <AdminNavComponent />
        <main className="flex-grow p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <Link to="/admin/categories/view" className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition duration-300">
                Regresar
              </Link>
              <h2 className="text-2xl font-bold">Agregar Categoría</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="categoryName" className="block text-gray-700 text-sm font-bold mb-2">
                    Nombre de la Categoría
                  </label>
                  <input
                    type="text"
                    id="categoryName"
                    required
                    value={categoryName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Agregar Categoría
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default ADADCategoriesPage;
