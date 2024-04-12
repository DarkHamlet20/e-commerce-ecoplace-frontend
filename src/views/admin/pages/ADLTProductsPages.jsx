import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const ADLTProductsPages = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product details", error);
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/products"); // Asegúrate de redirigir al usuario al listado de productos correcto
    } catch (error) {
      console.error("Error deleting product", error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-6 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8 space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Eliminar Producto</h2>
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <div className="grid grid-cols-3 gap-4">
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={`Imagen ${index + 1}`} className="w-full h-32 object-cover rounded-md"/>
          ))}
        </div>
        <p className="mt-4"><strong>Categorías: </strong>{product.categories.map(category => category.categoryName).join(', ')}</p>
        <div className="flex justify-between items-center mt-6">
          <Link to="/admin/products/view" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors">Regresar</Link>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            onClick={deleteProduct}
          >
            Confirmar Eliminación
          </button>
        </div>
      </div>
    </div>
  );
};

export default ADLTProductsPages;
