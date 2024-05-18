import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showConfirmationAlert, showErrorAlert } from '../../../helpers/alerts';
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminDLProducts.css';

const ADLTProductsPages = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const deleteProduct = async () => {
    showConfirmationAlert(
      'Confirmación',
      '¿Estás seguro de que quieres eliminar este producto?',
      'warning'
    ).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            showConfirmationAlert(
              'Eliminado!',
              'El producto ha sido eliminado correctamente.',
              'success'
            );
            navigate('/admin/products/view'); // Redirige al usuario a la vista de productos
          })
          .catch((error) => {
            console.error("Error deleting product:", error);
            showErrorAlert('Error al eliminar el producto.');
          });
      }
    });
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="delete-product-page delete-product-root">
      <AdminSidebar />
      <div className="delete-product-content-container">
        <AdminNavComponent />
        <div className="delete-product-main-content">
          <div className="delete-product-card">
            <h2 className="delete-product-title">Eliminar Producto</h2>
            <h3 className="delete-product-subtitle">{product.name}</h3>
            <div className="delete-product-image-container">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="delete-product-image"
                />
              ))}
            </div>
            <p className="delete-product-categories">
              <strong>Categorías:</strong> {product.categories.map((cat) => cat.categoryName).join(', ')}
            </p>
            <div className="delete-product-button-group">
              <Link to="/admin/products/view" className="delete-product-btn delete-product-btn-secondary">
                Regresar
              </Link>
              <button className="delete-product-btn delete-product-btn-danger" onClick={deleteProduct}>
                Confirmar Eliminación
              </button>
            </div>
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADLTProductsPages;
