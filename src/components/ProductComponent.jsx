import { useState, useEffect } from 'react';
import axios from "axios";
import { showAddCart, showErrorAlert } from '../helpers/alerts';
import '../styles/Global.css';

const ProductComponent = ({ id, name, images = [], description, brand, price, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(images[0] || '');

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      await axios.post('http://34.201.92.59:3000/carts/add', 
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
      showErrorAlert("Agregar al carrito", "Debes de iniciar sesión para agregar productos al carrito");
    }
  };

  return (
    <div id={id} className="my-10 mx-auto max-w-7xl p-4">
      <div className="flex flex-col lg:flex-row items-start h-full">
        <div className="w-full lg:w-1/2 p-4">
          <img src={selectedImage} className="object-contain w-full h-96 rounded-md shadow-lg mb-4 product-image" alt={name} />
          <div className="flex space-x-2 overflow-x-auto">
            {images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                className={`w-16 h-16 object-cover rounded-md cursor-pointer ${selectedImage === img ? 'selected-image' : ''}`} 
                alt={`${name} ${index}`} 
                onClick={() => setSelectedImage(img)} 
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 flex flex-col items-start">
          <span className="text-gray-600 mb-2">Brand: {brand}</span>
          <h2 className="text-3xl font-bold my-4">{name}</h2>
          <p className="my-5">{description}</p>
          <span className="text-2xl font-semibold mb-6">${price}</span>
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