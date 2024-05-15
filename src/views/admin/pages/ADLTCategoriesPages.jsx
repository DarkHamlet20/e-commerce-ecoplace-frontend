import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminDLTCategories.css';

const ADLTCategoriesPages = () => {
  const [category, setCategory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(`http://34.201.92.59:3000/categories/${id}`, {
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
          axios.delete(`http://34.201.92.59:3000/categories/${id}`, {
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
    <div className="page-container">
      <AdminSidebar />
      <div className="main-content">
        <AdminNavComponent />
        <div className="content-wrapper">
          <div className="card">
            <h2>Eliminar Categoría</h2>
            <p>¿Estás seguro de que quieres eliminar la categoría <strong>{category.categoryName}</strong>?</p>
            <div className="button-group">
              <button
                className="btn btn-danger"
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
      <AdminFooterComponent />
    </div>
  );
};

export default ADLTCategoriesPages;
