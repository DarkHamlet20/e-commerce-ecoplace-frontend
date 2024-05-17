import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import SellerNavComponent from "../components/SellerNavComponent";
import SellerSidebarComponent from "../components/SellerSidebarComponent";
import SellerFooterComponent from "../components/SellerFooterComponent";
import '../styles/SellerUPDProducts.css'; // Asegúrate de importar el archivo CSS

const SLUPDProductPages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: "",
    categories: [],
    countInStock: "",
    isFeatured: false,
  });
  const [categories, setCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(null);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, [id, token]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://34.201.92.59:3000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const product = response.data;
      setFormData({
        name: product.name,
        description: product.description,
        brand: product.brand,
        price: product.price,
        categories: product.categories.map((cat) => cat._id),
        countInStock: product.countInStock,
        isFeatured: product.isFeatured,
      });
      setCurrentImage(product.images[0]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://34.201.92.59:3000/categories", {
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
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, categories: selectedOptions }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "categories") {
        value.forEach((category) => updateData.append("categories", category));
      } else {
        updateData.append(key, value);
      }
    });

    if (selectedFiles.length) {
      for (const file of selectedFiles) {
        updateData.append("images", file);
      }
    }

    try {
      await axios.patch(
        `http://34.201.92.59:3000/products/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await showConfirmationAlert("¡Éxito!", "Producto actualizado correctamente.", "success");
      navigate("/seller/products/view");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      showErrorAlert("Error", "No se pudo actualizar el producto.");
    }
  };

  if (isLoading) return <div className="text-center">Cargando...</div>;

  return (
    <div className="seller-update-product-page">
      <SellerNavComponent />
      <div className="dashboard-content">
        <SellerSidebarComponent />
        <div className="main-content">
          <div className="content-header">
            <h2>Actualizar Producto</h2>
            <Link to="/seller/products/view" className="btn btn-secondary">Regresar</Link>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit} className="form" encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="images">Imágenes</label>
                {currentImage && (
                  <div className="current-image">
                    <img src={currentImage} alt="Imagen actual del producto" />
                  </div>
                )}
                <input type="file" id="images" multiple onChange={handleFileChange} />
              </div>
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
                <Link to="/seller/products/view" className="btn btn-secondary">Cancelar</Link>
                <button type="submit" className="btn btn-primary">Actualizar Producto</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SLUPDProductPages;
