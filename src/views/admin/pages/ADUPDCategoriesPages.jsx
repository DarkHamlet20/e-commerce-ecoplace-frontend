import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import AdminFooterComponent from "../components/AdminFooterComponent";
import 'tailwindcss/tailwind.css';

const ADUPDCategoriesPages = () => {
  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/categories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategoryName(response.data.categoryName);
      } catch (error) {
        console.error("Error fetching category details", error);
        showErrorAlert(
          "Error",
          "No se pudo cargar los detalles de la categoría."
        );
      }
    };

    fetchCategoryDetails();
  }, [id, token]);

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/categories/${id}`,
        { categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await showConfirmationAlert(
        "¡Éxito!",
        "Categoría actualizada correctamente.",
        "success",
        "Aceptar"
      );
      navigate("/admin/categories/view");
    } catch (error) {
      console.error("Error updating category", error);
      showErrorAlert(
        "Error",
        "No se pudo actualizar la categoría. Intente nuevamente."
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
              <h2 className="text-2xl font-bold">Actualizar Categoría</h2>
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
                    Actualizar Categoría
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

export default ADUPDCategoriesPages;
