import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import { showErrorAlert, showConfirmationAlert } from "../../../helpers/alerts";
import SellerNavComponent from "../components/SellerNavComponent";
import SellerSidebarComponent from "../components/SellerSidebarComponent";
import SellerFooterComponent from "../components/SellerFooterComponent";

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
      const response = await axios.get(`https://ecoplace-api.zeabur.app/products/${id}`, {
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
      const response = await axios.get("https://ecoplace-api.zeabur.app/categories", {
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
        `https://ecoplace-api.zeabur.app/products/${id}`,
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
    <div className="d-flex flex-column" style={{ marginTop: "60px" }}>
      <div className="d-flex min-vh-100">
        <SellerSidebarComponent />
        <div className="flex-grow-1">
          <SellerNavComponent />
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-2xl text-gray-800">Actualizar Producto</h2>
              <Link to="/seller/products/view" className="btn btn-info">Regresar</Link>
            </div>
            <div className="card p-5" style={{ maxWidth: "800px", margin: "auto" }}>
              <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">
                <div className="mb-4"> {/* Imágenes */}
                  <label htmlFor="images" className="form-label">Imágenes</label>
                  {currentImage && (
                    <div className="mb-3">
                      <img
                        src={currentImage}
                        alt="Imagen actual del producto"
                        style={{ width: '100px', borderRadius: '10px' }}
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>
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
                <div className="mb-4"> {/* Selección de categorías */}
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
                <div className="d-flex justify-content-between"> {/* Botón para cancelar y para actualizar */}
                  <Link to="/seller/products/view" className="btn btn-secondary">Cancelar</Link>
                  <button type="submit" className="btn btn-primary">Actualizar Producto</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SLUPDProductPages;
