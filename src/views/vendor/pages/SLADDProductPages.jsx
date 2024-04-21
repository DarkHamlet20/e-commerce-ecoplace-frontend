import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showConfirmationAlert, showErrorAlert } from "../../../helpers/alerts";
import SellerNavComponent from "../components/SellerNavComponent";
import SellerSidebarComponent from "../components/SellerSidebarComponent";
import SellerFooterComponent from "../components/SellerFooterComponent";

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
        const response = await axios.get("http://localhost:3000/categories", {
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
        "http://localhost:3000/products",
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
    <div className="d-flex flex-column" style={{ marginTop: "60px" }}>
      <div className="d-flex min-vh-100">
        <SellerSidebarComponent />
        <div className="flex-grow-1">
          <SellerNavComponent />
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-2xl font-semibold text-dark">Agregar Producto</h2>
              <Link to="/seller/products/view" className="btn btn-info">
                Regresar
              </Link>
            </div>
            <div className="card p-5 mb-3" style={{ maxWidth: "800px", margin: "auto" }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div>
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
                <div className="d-flex justify-content-between">
                  <Link to="/seller/products/view" className="btn btn-secondary">Regresar</Link>
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
      <SellerFooterComponent />
    </div>
  );
};

export default SLADDProductPages;
