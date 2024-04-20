import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";

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
    <div className="d-flex flex-column" style={{ marginTop: "60px" }}>
      <div className="d-flex min-vh-100">
        <AdminSidebar />
        <div className="flex-grow-1">
          <AdminNavComponent />
          <div className="container mt-4">
            <div className="text-center mb-4">
              <h2 className="text-dark">Agregar Categoría</h2>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <Link to="/admin/categories/view" className="btn btn-secondary">
                Regresar
              </Link>
            </div>
            <div className="card p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="categoryName" className="form-label">
                    Nombre de la Categoría
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    required
                    value={categoryName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Agregar Categoría
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADADCategoriesPage;
