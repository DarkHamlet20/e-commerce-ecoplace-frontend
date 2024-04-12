import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ADUPDPages = () => {
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
  const { id } = useParams(); 
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ ...response.data, categories: response.data.categories.map(cat => cat._id) });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details", error);
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
      console.error("Error fetching categories", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
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
      if (key === "categories") {
        value.forEach((category) => updateData.append("categories", category));
      } else {
        updateData.append(key, value);
      }
    });
    if (selectedFiles.length) {
      for (let file of selectedFiles) {
        updateData.append("images", file);
      }
    }

    try {
      await axios.patch(
        `http://localhost:3000/products/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/admin/products/view"); // Asegura que esta ruta es correcta para ver productos
    } catch (error) {
      console.error("Error updating product", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Actualizar Producto</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre del Producto
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                id="name"
                type="text"
                placeholder="Nombre"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Precio
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                id="price"
                type="number"
                placeholder="Precio"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Descripción
            </label>
            <textarea
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
                id="description"
                placeholder="Descripción detallada del producto"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories">
              Categorías
            </label>
            <select
              multiple
              className="block w-full bg-gray-200 border rounded py-2 px-3 leading-tight focus:outline-none focus:bg-white"
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
              Imágenes
            </label>
            <input
              type="file"
              multiple
              className="block w-full text-gray-700"
              id="images"
              name="images"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex justify-between">
            <Link to="/admin/products/view" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Regresar
            </Link>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Actualizar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ADUPDPages;
