import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";

const ADLTCategoriesPages = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategory(response.data);
      } catch (error) {
        console.error("Error fetching category details", error);
        showErrorAlert('Error al cargar los detalles de la categoría');
      }
    };

    fetchCategoryDetails();
  }, [id, token]);

  const deleteCategory = async () => {
    showConfirmationAlert('Confirmación', '¿Estás seguro de que quieres eliminar esta categoría?', 'warning')
      .then((result) => {
        if (result.isConfirmed) {
          axios.delete(`http://localhost:3000/categories/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }).then(response => {
            showConfirmationAlert('Eliminado!', 'La categoría ha sido eliminada correctamente.', 'success');
            navigate("/admin/categories/view"); // Redirige al usuario a la lista de categorías
          }).catch(error => {
            console.error("Error deleting category", error);
            showErrorAlert('Error al eliminar la categoría');
          });
        }
      });
  };

  if (!category) return <div>Cargando...</div>;

  return (
    <div className="min-h-screen bg-blue-900 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Eliminar Categoría</h2>
        <div>
          <p className="mb-4">¿Estás seguro de que quieres eliminar la categoría <strong>{category.categoryName}</strong>?</p>
          <div className="flex justify-center">
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mr-2"
              onClick={deleteCategory}
            >
              Confirmar Eliminación
            </button>
            <Link
              to="/admin/categories/view"
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancelar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADLTCategoriesPages;
