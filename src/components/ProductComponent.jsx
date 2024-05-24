import { useState } from 'react';
import axios from "axios";
import { showAddCart, showErrorAlert } from '../helpers/alerts';

const ProductComponent = ({ id, name, img, description, brand, price, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post('http://localhost:3000/carts/add', 
        {
          items: [{ product: id, quantity }] 
        }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onAddToCart(); // Llama a la función para actualizar el contador del carrito
      showAddCart();
    } catch (error) {
      console.error("Error al agregar al carrito", error);
      showErrorAlert("Agregar al carrito", "Debes de iniciar sesion para agregar productos al carrito");
    }
  };

  return (
    <div id={id} className="my-10 smm:my-20">
      <div className="flex flex-col lg:flex-row items-center h-full">
        <div className="w-full lg:w-1/2 p-4">
          <img src={img} className="aspect-square object-contain w-full rounded-md" alt={name} />
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <span className="text-gray-600">Brand: {brand}</span>
          <h2 className="text-3xl font-bold my-4">{name}</h2>
          <p className="my-5">{description}</p>
          <span className="text-2xl font-semibold">${price}</span>
          <div className="flex my-8 items-center">
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={handleQuantityChange} 
              className="w-16 text-center p-2 border rounded-md mr-4" 
            />
            <button 
              onClick={addToCart} 
              className="bg-blue-600 text-white rounded-md p-2 transition hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
