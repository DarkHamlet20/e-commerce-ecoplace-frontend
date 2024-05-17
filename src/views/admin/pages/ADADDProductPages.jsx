import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showErrorAlert, showConfirmationAlert } from '../../../helpers/alerts';
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminADProducts.css';

const ADADDProductPages = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    brand: '',
    price: 0,
    categories: [],
    seller: '',
    countInStock: 0,
    isFeatured: false,
  });
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://34.201.92.59:3000/categories', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, categories: selectedCategories });
  };

  const handleFileChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'categories') {
        value.forEach((category) => formDataToSend.append('categories', category));
      } else {
        formDataToSend.append(key, value);
      }
    });

    if (imageFiles.length) {
      for (const file of imageFiles) {
        formDataToSend.append('images', file);
      }
    }

    try {
      const response = await axios.post(
        'http://34.201.92.59:3000/products',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await showConfirmationAlert('¡Éxito!', 'Producto agregado correctamente.', 'success', 'Hecho');
      navigate('/admin/products/view'); // Redirige a la lista de productos
    } catch (error) {
      console.error('Error al agregar el producto:', error);
      showErrorAlert('Error', 'Error al agregar el producto.');
    }
  };

  return (
    <div className="admin-add-product-page add-product-root">
      <AdminSidebar />
      <div className="add-product-content-container">
        <AdminNavComponent />
        <div className="add-product-main-content">
          <div className="add-product-header">
            <h2>Agregar Producto</h2>
            <Link to="/admin/products/view" className="add-product-btn add-product-btn-secondary">
              Regresar
            </Link>
          </div>
          <div className="add-product-form-container">
            <form onSubmit={handleSubmit} className="add-product-form">
              <div className="add-product-form-group">
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
              <div className="add-product-form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="add-product-form-group">
                <label htmlFor="images">Imágenes</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <div className="add-product-form-group">
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
              <div className="add-product-form-group">
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
              <div className="add-product-form-group">
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
              <div className="add-product-form-group">
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
              <div className="add-product-form-group checkbox-group">
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
              <div className="add-product-buttons">
                <Link to="/admin/products/view" className="add-product-btn add-product-btn-secondary">
                  Cancelar
                </Link>
                <button type="submit" className="add-product-btn add-product-btn-primary">
                  Agregar Producto
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

export default ADADDProductPages;
