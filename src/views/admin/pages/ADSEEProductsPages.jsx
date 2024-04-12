import axios from "axios";
import { useEffect, useState } from "react";


const ADSEEProductsPages = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
      // Manejar el error (mostrar mensaje al usuario, etc.)
    }
  };

  return (
    <>
      <div className="min-h-screen bg-blue-900 flex justify-center items-center px-6 py-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Eliminar Producto</h2>
        <ul>
          {products.map((product) => (
            <li key={product._id} className="flex justify-between items-center p-3 border-b">
              {product.name}
              
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default ADSEEProductsPages