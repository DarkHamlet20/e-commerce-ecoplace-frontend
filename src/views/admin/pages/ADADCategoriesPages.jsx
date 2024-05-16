import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminADCategories.css';

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
        "http://34.201.92.59:3000/categories",
        { categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // Redirigir al usuario a la lista de categorías
      await showConfirmationAlert(
        "¡Éxito!",
        "Categoría agregada correctamente.",
        "success",
        "Aceptar"
      );
      navigate("/admin/categories/view");
    } catch (error) {
      console.error("Error al agregar la categoría", error);
      // Maneja el error aquí
      showErrorAlert(
        "Error",
        "No se pudo agregar la categoría. Intente nuevamente."
      );
    }
  };

  return (
    <div className="categories-page categories-root">
      <AdminSidebar />
      <div className="categories-content-container">
        <AdminNavComponent />
        <div className="categories-main-content">
          <div className="categories-header">
            <Link to="/admin/categories/view" className="categories-btn categories-btn-secondary">Regresar</Link>
            <h2 className="categories-title">Agregar Categoría</h2>
          </div>
          <div className="categories-form-wrapper">
            <div className="categories-form-container">
              <div className="categories-card">
                <form onSubmit={handleSubmit}>
                  <div className="categories-form-group">
                    <label htmlFor="categoryName">Nombre de la Categoría</label>
                    <input
                      type="text"
                      id="categoryName"
                      required
                      value={categoryName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="categories-text-center">
                    <button type="submit" className="categories-btn categories-btn-primary">
                      Agregar Categoría
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADADCategoriesPage;
