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

  if (!product) return <div className="text-center">Cargando...</div>;

  return (
    <div className="flex min-h-screen">
      <SellerSidebarComponent />
      <div className="flex-grow flex flex-col">
        <SellerNavComponent />
        <div className="flex-grow p-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Eliminar Producto</h2>
              <Link
                to="/seller/products/view"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Regresar
              </Link>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-medium mb-4">{product.name}</h3>
              <div className="flex justify-center mb-4">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="w-32 h-32 object-cover rounded mx-2"
                  />
                ))}
              </div>
              <p className="mb-4">
                <strong>Categorías:</strong> {product.categories.map((cat) => cat.categoryName).join(", ")}
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/seller/products/view"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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
    </div>
  );
};

export default SLDLTProductPages;
