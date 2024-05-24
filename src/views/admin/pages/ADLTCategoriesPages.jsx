import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import AdminFooterComponent from "../components/AdminFooterComponent";
import 'tailwindcss/tailwind.css';

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
            navigate("/admin/categories/view");
          }).catch(error => {
            console.error("Error deleting category", error);
            showErrorAlert('Error al eliminar la categoría');
          });
        }
      });
  };

  if (!category) return <div>Cargando...</div>;

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
              <h2 className="text-2xl font-bold">Eliminar Categoría</h2>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Eliminar Categoría</h2>
              <p className="mb-4">
                ¿Estás seguro de que quieres eliminar la categoría <strong>{category.categoryName}</strong>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  onClick={deleteCategory}
                >
                  Confirmar Eliminación
                </button>
                <Link
                  to="/admin/categories/view"
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                >
                  Cancelar
                </Link>
              </div>
            </div>
          </div>
        </main>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default ADLTCategoriesPages;
