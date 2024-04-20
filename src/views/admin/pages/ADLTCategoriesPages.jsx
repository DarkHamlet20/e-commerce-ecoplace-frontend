import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
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
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}> {/* Compensar el navbar */}
      <div className="d-flex min-vh-100"> {/* Estructura principal */}
        <AdminSidebar /> {/* Sidebar */}
        <div className="flex-grow-1"> {/* Contenedor principal */}
          <AdminNavComponent /> {/* Navbar */}
          <div className="container mt-4"> {/* Contenedor para el contenido */}
            <div className="d-flex justify-content-center"> {/* Centrando el formulario */}
              <div className="card p-4" style={{ maxWidth: '600px' }}> {/* Tarjeta para el formulario */}
                <h2 className="text-center">Eliminar Categoría</h2> {/* Título */}
                <p>¿Estás seguro de que quieres eliminar la categoría <strong>{category.categoryName}</strong>?</p> {/* Pregunta de confirmación */}
                <div className="d-flex justify-content-center mt-4"> {/* Botones */}
                  <button
                    className="btn btn-danger me-2"
                    onClick={deleteCategory}
                  >
                    Confirmar Eliminación
                  </button>
                  <Link
                    to="/admin/categories/view"
                    className="btn btn-secondary"
                  >
                    Cancelar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADLTCategoriesPages;
