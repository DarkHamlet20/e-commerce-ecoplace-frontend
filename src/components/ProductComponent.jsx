import { useState } from 'react'
import './Product.css'
import axios from "axios";
import { showAddCart, showErrorAlert } from '../helpers/alerts';

const ProductComponent = ({ id, name, img, description, brand, price }) => {



  const addToCart = async () => {
    try {
      // Suponiendo que tienes almacenado el token de autenticación en localStorage
      const token = localStorage.getItem('auth_token');
      await axios.post('http://34.201.92.59:3000/carts/add', 
        {
          items: [{ product: id, quantity: 1 }] // Ajusta según necesites
        }, 
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showAddCart()
    } catch (error) {
      console.error("Error al agregar al carrito", error);
      showErrorAlert("Agregar al carrito","Debes de iniciar sesion para agregar productos al carrito")
    }
  };

  
  return (
    <>
      <main id={id} className="my-10 smm:my-20">
        <div className="flex items-center h-full">
          <div className="w-[90%] lg:w-[850px] mx-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] product-container p-6 ">
            <div className="mr-3">
              <picture>
                <img
                  src={img}
                  className=" aspect-square object-contain w-80 rounded-md"
                  alt=""
                />
              </picture>
            </div>
            <div>
              <span>Brand: {brand}</span>
              <h2 className='text-3xl font-bold my-4'>{name}</h2>
              <p className='my-5'>{description}</p>
              <span className='text-2xl'>${price}</span>
              <div className='flex my-8 mx-auto flex-col w-52 smm:flex smm:flex-row smm:w-full text-center '>
                <button onClick={addToCart} className='bg-blue-950 text-white rounded-md p-2 text'>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductComponent;
