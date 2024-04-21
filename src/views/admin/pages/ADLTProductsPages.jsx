import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showConfirmationAlert, showErrorAlert } from '../../../helpers/alerts';

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
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}> {/* Ajuste para el navbar */}
      <div className="d-flex min-vh-100"> {/* Estructura principal */}
        <AdminSidebar /> {/* Sidebar */}
        <div className="flex-grow-1"> {/* Contenedor principal */}
          <AdminNavComponent /> {/* Navbar */}
          <div className="container mt-4"> {/* Contenedor para el contenido */}
            <div className="card p-5" style={{ maxWidth: '800px' }}> {/* Tarjeta para el formulario */}
              <h2 className="text-center text-dark">Eliminar Producto</h2>
              <h3 className="text-center">{product.name}</h3> {/* Nombre del producto */}
              <div className="d-flex justify-content-center my-4"> {/* Imágenes del producto */}
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Imagen ${index + 1}`}
                    className="rounded-circle me-3"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                ))}
              </div>
              <p>
                <strong>Categorías:</strong> {product.categories.map((cat) => cat.categoryName).join(', ')}
              </p>
              <div className="d-flex justify-content-between"> {/* Botón para regresar y eliminar */}
                <Link
                  to="/admin/products/view"
                  className="btn btn-secondary"
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
    </div>
  );
};

export default ADLTProductsPages;
