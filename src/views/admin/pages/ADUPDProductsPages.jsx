import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showErrorAlert, showConfirmationAlert } from '../../../helpers/alerts';
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminUPProducts.css';

const ADUPDProductsPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    price: '',
    categories: [],
    countInStock: '',
    isFeatured: false,
  });
  const [categories, setCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(null); // Para mostrar la imagen actual
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, [id, token]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const product = response.data;
      setFormData({ ...product, categories: product.categories.map(cat => cat._id) });
      setCurrentImage(product.images[0]); // Establece la imagen actual
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({ ...prev, categories: selectedOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'categories') {
        value.forEach((category) => updateData.append('categories', category));
      } else {
        updateData.append(key, value);
      }
    });
    if (selectedFiles.length) {
      for (let file of selectedFiles) {
        updateData.append('images', file);
      }
    }

    try {
      await axios.patch(
        `http://localhost:3000/products/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await showConfirmationAlert('¡Éxito!', 'Producto actualizado correctamente.', 'success', 'Aceptar');
      navigate('/admin/products/view'); // Asegura que esta ruta es correcta para ver productos
    } catch (error) {
      console.error("Error updating product:", error);
      showErrorAlert('Error', 'No se pudo actualizar el producto. Intente nuevamente.');
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="update-product-page update-product-root">
      <AdminSidebar />
      <div className="update-product-content-container">
        <AdminNavComponent />
        <div className="update-product-main-content">
          <div className="update-product-header">
            <h2>Actualizar Producto</h2>
            <Link to="/admin/products/view" className="update-product-btn update-product-btn-secondary">
              Regresar
            </Link>
          </div>
          <div className="update-product-form-container">
            <form onSubmit={handleSubmit} className="update-product-form" encType="multipart/form-data">
              <div className="update-product-form-group">
                <label htmlFor="name">Nombre del Producto</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="update-product-form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="update-product-form-group">
                <label htmlFor="images">Imágenes</label>
                {currentImage && (
                  <div className="current-image">
                    <img src={currentImage} alt="Imagen actual del producto" />
                  </div>
                )}
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <div className="update-product-form-group">
                <label htmlFor="brand">Marca</label>
                <input
                  type="text"
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="update-product-form-group">
                <label htmlFor="price">Precio</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="update-product-form-group">
                <label htmlFor="categories">Categorías</label>
                <select
                  multiple
                  id="categories"
                  name="categories"
                  value={formData.categories}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="update-product-form-group">
                <label htmlFor="countInStock">Cantidad en Stock</label>
                <input
                  type="number"
                  id="countInStock"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="update-product-form-group checkbox-group">
                <label htmlFor="isFeatured">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                  />
                  ¿Es destacado?
                </label>
              </div>
              <div className="update-product-buttons">
                <Link to="/admin/products/view" className="update-product-btn update-product-btn-secondary">
                  Cancelar
                </Link>
                <button type="submit" className="update-product-btn update-product-btn-primary">
                  Actualizar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADUPDProductsPages;
