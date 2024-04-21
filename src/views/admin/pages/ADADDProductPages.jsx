import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import { showErrorAlert, showConfirmationAlert } from '../../../helpers/alerts';
import AdminFooterComponent from "../components/AdminFooterComponent";

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
        const response = await axios.get('http://localhost:3000/categories', {
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
        'http://localhost:3000/products',
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
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}> {/* Ajuste para el navbar */}
      <div className="d-flex min-vh-100"> {/* Estructura principal */}
        <AdminSidebar /> {/* Sidebar */}
        <div className="flex-grow-1"> {/* Contenedor principal */}
          <AdminNavComponent /> {/* Navbar */}
          <div className="container mt-4"> {/* Contenedor para el formulario */}
            <div className="d-flex justify-content-between align-items-center"> {/* Título y botón de regresar */}
              <h2 className="text-center text-dark">Agregar Producto</h2>
              <Link
                to="/admin/products/view"
                className="btn btn-secondary"
              >
                Regresar
              </Link>
            </div>
            <div className="d-flex justify-content-center"> {/* Formulario para agregar producto */}
              <div className="card p-5 mb-3" style={{ maxWidth: '800px' }}> {/* Tarjeta para el formulario */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-4"> {/* Campo para el nombre */}
                    <label htmlFor="name" className="form-label">Nombre del Producto</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4"> {/* Campo para la descripción */}
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4"> {/* Campo para las imágenes */}
                    <label htmlFor="images" className="form-label">Imágenes</label>
                    <input
                      type="file"
                      className="form-control"
                      id="images"
                      name="images"
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="mb-4"> {/* Campo para la marca */}
                    <label htmlFor="brand" className="form-label">Marca</label>
                    <input
                      type="text"
                      className="form-control"
                      id="brand"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4"> {/* Campo para el precio */}
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4"> {/* Campo para las categorías */}
                    <label htmlFor="categories" className="form-label">Categorías</label>
                    <select
                      multiple
                      className="form-control"
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
                  <div className="mb-4"> {/* Campo para la cantidad en stock */}
                    <label htmlFor="countInStock" className="form-label">Cantidad en Stock</label>
                    <input
                      type="number"
                      className="form-control"
                      id="countInStock"
                      name="countInStock"
                      value={formData.countInStock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-4"> {/* Campo para indicar si es destacado */}
                    <label htmlFor="isFeatured" className="form-label">
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
                  <div className="d-flex justify-content-between"> {/* Botón para regresar y botón para agregar */}
                    <Link
                      to="/admin/products/view"
                      className="btn btn-secondary"
                    >
                      Cancelar
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-primary"
                    >
                      Agregar Producto
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

export default ADADDProductPages;
