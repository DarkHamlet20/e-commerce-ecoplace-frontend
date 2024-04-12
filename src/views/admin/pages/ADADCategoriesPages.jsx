import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      // Redirigir al usuario a la lista de categorías
      navigate("/admin/categories/view");
    } catch (error) {
      console.error("Error al agregar la categoría", error);
      // Maneja el error aquí
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Agregar Categoría</h2>
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
              Agregar Categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ADADCategoriesPage;
