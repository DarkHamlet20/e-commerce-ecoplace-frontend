import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showConfirmationAlert, showErrorAlert } from "../../../helpers/alerts";
import SellerNavComponent from "../components/SellerNavComponent";
import SellerSidebarComponent from "../components/SellerSidebarComponent";
import SellerFooterComponent from "../components/SellerFooterComponent";
import '../styles/SellerAddProducts.css';

const SLADDProductPages = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
    categories: [],
    seller: "",
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    isFeatured: false,
  });
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://34.201.92.59:3000/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
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
      if (key === "categories") {
        value.forEach((category) => formDataToSend.append("categories", category));
      } else {
        formDataToSend.append(key, value);
      }
    });

    imageFiles.forEach((file) => {
      formDataToSend.append("images", file);
    });

    try {
      const response = await axios.post(
        "http://34.201.92.59:3000/products",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await showConfirmationAlert("¡Éxito!", "Producto agregado correctamente.", "success");
      navigate("/seller/products/view");
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      showErrorAlert("Error", "Error al agregar el producto.");
    }
  };

  return (
    <div className="seller-add-product-page">
      <SellerNavComponent />
      <div className="dashboard-content">
        <SellerSidebarComponent />
        <div className="main-content">
          <div className="content-header">
            <h2>Agregar Producto</h2>
            <Link to="/seller/products/view" className="btn btn-secondary">Regresar</Link>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="images">Imágenes</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group">
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
              <div className="form-group checkbox-group">
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
              <div className="form-actions">
                <Link to="/seller/products/view" className="btn btn-secondary">Regresar</Link>
                <button type="submit" className="btn btn-primary">Agregar Producto</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SLADDProductPages;