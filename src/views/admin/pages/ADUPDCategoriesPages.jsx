import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";

const ADUPDCategoriesPages = () => {
  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    // Cargar los detalles de la categoría
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategoryName(response.data.categoryName);
      } catch (error) {
        console.error("Error fetching category details", error);
        showErrorAlert('Error', 'No se pudo cargar los detalles de la categoría.');
        // Manejar el error aquí
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
      await showConfirmationAlert('¡Éxito!', 'Categoría actualizada correctamente.', 'success', 'Aceptar');
      navigate("/admin/categories/view"); // Redirige al usuario a la lista de categorías
    } catch (error) {
      console.error("Error updating category", error);
      showErrorAlert('Error', 'No se pudo actualizar la categoría. Intente nuevamente.');
      // Manejar el error aquí
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Actualizar Categoría</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="categoryName"
            >
              Nombre de la Categoría
            </label>
            <input
              className="w-full p-2 border rounded-md"
              id="categoryName"
              type="text"
              name="categoryName"
              value={categoryName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Actualizar Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ADUPDCategoriesPages;
