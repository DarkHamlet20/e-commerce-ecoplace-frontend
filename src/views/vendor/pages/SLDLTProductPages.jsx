import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import SellerNavComponent from "../components/SellerNavComponent";
import SellerSidebarComponent from "../components/SellerSidebarComponent";
import SellerFooterComponent from "../components/SellerFooterComponent";

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
      const response = await axios.get(`http://localhost:3000/products/${id}`, {
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
          .delete(`http://localhost:3000/products/${id}`, {
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

  if (!product) return <div className="text-center">Cargando...</div>;

  return (
    <div className="d-flex flex-column" style={{ marginTop: "60px" }}>
      <div className="d-flex min-vh-100">
        <SellerSidebarComponent />
        <div className="flex-grow-1">
          <SellerNavComponent />
          <div className="container mt-4">
            <div className="card p-5" style={{ maxWidth: "800px", margin: "auto" }}>
              <h2 className="text-center text-2xl text-gray-800">Eliminar Producto</h2>
              <h3 className="text-center text-xl">{product.name}</h3>
              <div className="d-flex justify-content-center my-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="rounded"
                    style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
                  />
                ))}
              </div>
              <p className="text-center">
                <strong>Categorías:</strong> {product.categories.map((cat) => cat.categoryName).join(", ")}
              </p>
              <div className="d-flex justify-content-between mt-4">
                <Link
                  to="/seller/products/view"
                  className="btn btn-info"
                >
                  Regresar
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={deleteProduct}
                >
                  Confirmar Eliminación
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SLDLTProductPages;
