import React, { useState, useEffect } from "react";
import axios from "axios";

const ADADDProductPages = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
    categories: [],
    seller: "", // Asegúrate de establecer el ID del vendedor aquí
    countInStock: 0,
    rating: 0,
    numReviews: 0,
    isFeatured: false,
  });
  const [categories, setCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    // Llama a tu API para obtener las categorías y actualiza el estado
    // asumiendo que tu endpoint para obtener categorías es 'http://localhost:3000/categories'
    const fetchCategories = async () => {
      const response = await axios.get("http://localhost:3000/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
    console.log(selectedCategories); // Depuración para ver los IDs seleccionados
    setFormData({ ...formData, categories: selectedCategories });
  };
  

  const formDataToSend = new FormData();
  formDataToSend.append("name", formData.name);
  formDataToSend.append("description", formData.description);
  formDataToSend.append("brand", formData.brand);
  formDataToSend.append("price", formData.price);
  formDataToSend.append("countInStock", formData.countInStock);
  formDataToSend.append("isFeatured", formData.isFeatured);
  imageFiles.forEach((file) => {
    formDataToSend.append("images", file);
  });
  formData.categories.forEach((category) => {
    formDataToSend.append("categories", category);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Aquí se haría la petición POST a tu API
      const response = await axios.post(
        "http://localhost:3000/products",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      // Maneja la respuesta exitosa, como redirigir o limpiar el formulario
    } catch (error) {
      console.error("Error al agregar el producto", error);
      // Maneja errores aquí
    }
  };

  return (
    <div className="min-h-screen bg-blue-900 flex justify-center items-center px-6 py-8">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Agregar Producto
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="name"
            >
              Nombre del Producto
            </label>
            <input
              className="w-full p-2 border rounded-md"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="images"
            >
              Imágenes
            </label>
            <input
              className="w-full p-2 border rounded-md"
              id="images"
              type="file"
              name="images"
              multiple
              onChange={(e) => setImageFiles(Array.from(e.target.files))}
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="brand"
            >
              Marca
            </label>
            <input
              className="w-full p-2 border rounded-md"
              id="brand"
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="price"
            >
              Precio
            </label>
            <input
              className="w-full p-2 border rounded-md"
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="categories"
            >
              Categorías
            </label>
            <select
              className="w-full p-2 border rounded-md"
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleCategoryChange}
              multiple
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="countInStock"
            >
              Cantidad en Stock
            </label>
            <input
              className="w-full p-2 border rounded-md"
              id="countInStock"
              type="number"
              name="countInStock"
              value={formData.countInStock}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label
              className="flex items-center text-gray-700 text-sm font-semibold mb-2"
              htmlFor="isFeatured"
            >
              <input
                className="mr-2"
                id="isFeatured"
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) =>
                  setFormData({ ...formData, isFeatured: e.target.checked })
                }
              />
              Es destacado
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Agregar Producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ADADDProductPages;
