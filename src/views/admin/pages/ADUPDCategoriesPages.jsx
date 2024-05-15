import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminUPCategories.css';

const ADUPDCategoriesPages = () => {
  const [categoryName, setCategoryName] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    // Cargar los detalles de la categoría
    const fetchCategoryDetails = async () => {
      try {
        const response = await axios.get(
          `http://34.201.92.59:3000/categories/${id}`,
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
        `http://34.201.92.59:3000/categories/${id}`,
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
      navigate("/admin/categories/view"); // Redirige al usuario a la lista de categorías
    } catch (error) {
      console.error("Error updating category", error);
      showErrorAlert(
        "Error",
        "No se pudo actualizar la categoría. Intente nuevamente."
      );
      // Manejar el error aquí
    }
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <AdminSidebar />
        <div className="main-content">
          <AdminNavComponent />
          <div className="form-container">
            <div className="text-center mb-4">
              <h2 className="text-dark">Actualizar Categoría</h2>
            </div>
            <div className="back-button-container">
              <Link to="/admin/categories/view" className="btn-secondary">
                Regresar
              </Link>
            </div>
            <div className="card">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="categoryName">Nombre de la Categoría</label>
                  <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    value={categoryName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn-primary">
                    Actualizar Categoría
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADUPDCategoriesPages;
