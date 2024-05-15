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
    <div className="page-container">
      <div className="content-container">
        <AdminSidebar />
        <div className="main-content">
          <AdminNavComponent />
          <div className="header-container">
            <Link to="/admin/categories/view" className="btn-secondary">
              Regresar
            </Link>
            <h2 className="text-dark">Agregar Categoría</h2>
          </div>
          <div className="form-wrapper">
            <div className="form-container">
              <div className="card">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="categoryName">Nombre de la Categoría</label>
                    <input
                      type="text"
                      id="categoryName"
                      required
                      value={categoryName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn-primary">
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
