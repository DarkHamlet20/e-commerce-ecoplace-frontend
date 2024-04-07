import React, { useEffect, useState } from "react";
import axios from "axios";

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("https://ecoplace.3.us-1.fl0.io/carts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        setCartItems(response.data.items);
        // Calcular el precio total
        const total = response.data.items.reduce(
          (sum, item) => sum + item.quantity * item.price,
          0
        );
        setTotalPrice(total);
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError("Error fetching cart data");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Agregar mas productos al carrito
  const handleQuantityChange = async (itemId, newQuantity) => {
    newQuantity = Math.max(newQuantity, 1);
    try {
      // Actualizar la cantidad en la interfaz de usuario primero para una respuesta rápida
      const updatedCartItems = cartItems.map((item) => {
        if (item.product._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);

      // Llamada a la API para actualizar el carrito en el backend
      const response = await axios.put(
        "https://ecoplace.3.us-1.fl0.io/carts/update-cart",
        {
          items: [{ product: itemId, quantity: newQuantity }],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      // Actualizar el estado con la respuesta del backend si es necesario
      // setCartItems(response.data.items);
      console.log("Cart updated", response.data);
    } catch (error) {
      console.error("Error updating cart", error);
      // Revertir el cambio en la interfaz de usuario si la llamada a la API falla
      setCartItems(
        cartItems.map((item) => {
          if (item.product._id === itemId) {
            return { ...item, quantity: item.quantity }; // Restablecer a la cantidad original
          }
          return item;
        })
      );
      // Mostrar algún mensaje de error al usuario aquí
    }
  };

  //Eliminar productos del carrito
  const handleRemoveItemFromCart = async (productId) => {
    try {
      // Llamada a la API para eliminar el producto del carrito en el backend
      const response = await axios.delete(
        "https://ecoplace.3.us-1.fl0.io/carts/remove-item",
        {
          data: { product: productId }, // Enviando productId en el cuerpo de la solicitud DELETE
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      // Actualiza el estado del carrito para reflejar el producto eliminado
      const newCartItems = cartItems.filter(
        (item) => item.product._id !== productId
      );
      setCartItems(newCartItems);

      console.log("Product removed from cart", response.data);
    } catch (error) {
      console.error("Error removing product from cart", error);
      // Mostrar algún mensaje de error al usuario aquí
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="flex flex-col lg:flex-row bg-white shadow-md my-10 rounded-lg">
        <div className="w-full lg:w-3/4 px-10 py-10">
          {/* Encabezado del carrito */}
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Carrito de Compras</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          {/* Títulos de las columnas */}
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Detalles del Producto</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Cantidad</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Precio</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          {/* Lista de productos */}
          {cartItems.map((item) => (
            <div key={item.product._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
              {/* Imagen y detalles del producto */}
              <div className="flex w-2/5">
                {/* Imagen */}
                <img className="h-24" src={item.product.images[0]} alt={item.product.name} />
                {/* Detalles */}
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item.product.name}</span>
                  <span className="text-red-500 text-xs">{item.product.brand}</span>
                  <a onClick={() => handleRemoveItemFromCart(item.product._id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">Eliminar</a>
                </div>
              </div>
              {/* Cantidad y botones para incrementar y disminuir la cantidad */}
              <div className="flex justify-center w-1/5">
                <button onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)} className="fill-current text-gray-500 focus:outline-none">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3">
                    <path fillRule="evenodd" d="M5 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <input className="mx-2 border text-center w-8" type="text" value={item.quantity} />
                <button onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)} className="fill-current text-gray-500 focus:outline-none">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3">
                    <path fillRule="evenodd" d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {/* Precio unitario */}
              <span className="text-center w-1/5 font-semibold text-sm">${item.product.price}</span>
              {/* Precio total por producto */}
              <span className="text-center w-1/5 font-semibold text-sm">${(item.quantity * item.product.price).toFixed(2)}</span>
            </div>
          ))}

          {/* Botón de continuar comprando */}
          <a href="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
            {/* Ícono */}
            <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">{/* SVG icon code */}</svg>
            Continuar Comprando
          </a>
        </div>

        <div id="summary" className="w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Resumen del Pedido
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cartItems.length}
            </span>
            <span className="font-semibold text-sm">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Envío
            </label>
            <select className="block p-2 text-gray-600 w-full text-sm">
              <option>Standard shipping - $10.00</option>
            </select>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;