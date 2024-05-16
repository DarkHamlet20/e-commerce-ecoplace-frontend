import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import SellerNavComponent from "../components/SellerNavComponent";
import SellerSidebarComponent from "../components/SellerSidebarComponent";
import SellerFooterComponent from "../components/SellerFooterComponent";
import '../styles/SellerDLProducts.css';

const SLDLTProductPages = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://34.201.92.59:3000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const deleteProduct = async () => {
    showConfirmationAlert(
      "Confirmación",
      "¿Estás seguro de que quieres eliminar este producto?",
      "warning"
    ).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://34.201.92.59:3000/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            showConfirmationAlert(
              "Eliminado!",
              "El producto ha sido eliminado correctamente.",
              "success"
            );
            navigate("/seller/products/view");
          })
          .catch((error) => {
            console.error("Error al eliminar el producto:", error);
            showErrorAlert("Error", "No se pudo eliminar el producto.");
          });
      }
    });
  };

  if (!product) return <div className="sldlt-loading">Cargando...</div>;

  return (
    <div className="sldlt-product-page">
      <SellerSidebarComponent />
      <div className="sldlt-main-content">
        <SellerNavComponent />
        <div className="sldlt-content">
          <div className="sldlt-card">
            <h2>Eliminar Producto</h2>
            <h3>{product.name}</h3>
            <div className="sldlt-image-gallery">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="sldlt-product-image"
                />
              ))}
            </div>
            <p>
              <strong>Categorías:</strong> {product.categories.map((cat) => cat.categoryName).join(", ")}
            </p>
            <div className="sldlt-actions">
              <Link
                to="/seller/products/view"
                className="sldlt-btn sldlt-btn-secondary"
              >
                Regresar
              </Link>
              <button
                className="sldlt-btn sldlt-btn-danger"
                onClick={deleteProduct}
              >
                Confirmar Eliminación
              </button>
            </div>
          </div>
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SLDLTProductPages;
