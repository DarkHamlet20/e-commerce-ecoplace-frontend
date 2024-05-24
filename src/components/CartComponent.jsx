import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadTear } from "@fortawesome/free-solid-svg-icons";
import { showErrorAlert } from "../helpers/alerts";

const stripePromise = loadStripe(
  "pk_test_51P2M6HIsT8wuHxVRe2GCd60YLng0HonCFfnmMdz7gqRHYU5aoKBBJVcp1fDwMKoLrVPAByLSzzdlo14hs539PkV3003lnCO3WT"
);

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/carts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        setCartItems(response.data.items);
        setTotalPrice(response.data.total);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching cart data:", error);
        showErrorAlert("Error fetching cart data:");
      }
    };

    fetchCartItems();
  }, [totalPrice]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    newQuantity = isNaN(newQuantity) || newQuantity < 1 ? 1 : newQuantity;
    try {
      await axios.put(
        "http://localhost:3000/carts/update-cart",
        {
          items: [{ product: itemId, quantity: newQuantity }],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      const updatedCartItems = cartItems.map((item) => {
        if (item.product._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      const newTotalPrice = updatedCartItems.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );
      setTotalPrice(newTotalPrice);
    } catch (error) {
      console.error("Error updating cart", error);
      showErrorAlert("Error al actualizar el carrito");
    }
  };

  const handleRemoveItemFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/carts/remove-item",
        {
          data: { product: productId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      const newCartItems = cartItems.filter(
        (item) => item.product._id !== productId
      );
      setCartItems(newCartItems);
      const newTotalPrice = newCartItems.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );
      setTotalPrice(newTotalPrice);
    } catch (error) {
      console.error("Error removing product from cart", error);
      showErrorAlert("Error eliminando producto del carrito");
    }
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const checkoutSession = await axios.post(
        "http://localhost:3000/orders/create-checkout-session",
        { items: cartItems },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.sessionId,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Cargando tu carrito...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FontAwesomeIcon
          icon={faSadTear}
          size="6x"
          className="text-gray-600 my-2"
        />
        <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
        <p className="mb-6 text-gray-800">
          Parece que aún no has añadido nada a tu carrito.
        </p>
        <a href="/" className="text-indigo-600 hover:underline">
          Empieza a comprar
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-5">
      <div className="flex flex-col lg:flex-row bg-white shadow-md my-10 rounded-lg">
        <div className="w-full lg:w-3/4 px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Carrito de Compras</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Detalles del Producto
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Cantidad
            </h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
              Precio
            </h3>
            <h3 className="font-semibold text-right text-gray-600 text-xs uppercase w-1/5">
              Total
            </h3>
          </div>
          {cartItems.map((item) => (
            <div
              key={item?.product?._id}
              className="flex items-center border gap-2 mb-3 hover:bg-gray-100 -mx-8 px-6 py-5"
            >
              <div className="flex w-2/5">
                <img
                  className="h-24 aspect-square object-contain"
                  src={item?.product.images[0]}
                  alt={item?.product.name}
                />
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{item?.product?.name}</span>
                  <span className="text-red-500 text-xs">{item?.product?.brand}</span>
                  <a
                    onClick={() => handleRemoveItemFromCart(item?.product?._id)}
                    className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                  >
                    Eliminar
                  </a>
                </div>
              </div>
              <div className="flex items-center mx-2 flex-row justify-center w-1/5">
                <button
                  onClick={() =>
                    handleQuantityChange(item?.product?._id, item?.quantity - 1)
                  }
                  className="fill-current text-gray-500 focus:outline-none"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3">
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <input
                  className="mx-2 border text-center w-8"
                  type="text"
                  value={item?.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item?.product?._id,
                      parseInt(e.target.value)
                    )
                  }
                />
                <button
                  onClick={() =>
                    handleQuantityChange(item?.product?._id, item.quantity + 1)
                  }
                  className="fill-current text-gray-500 focus:outline-none"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${item?.product?.price}
              </span>
              <span className=" text-center ml-4 w-1/5 font-semibold text-sm">
                ${(item?.quantity * item?.product?.price).toFixed(2)}
              </span>
            </div>
          ))}
          <a
            href="/"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H0V216H134.059L66.618 148.118 109.882 104.94 232 232 109.882 359.059 66.618 315.882 134.059 296zM416 96c17.673 0 32 14.327 32 32v256c0 17.673-14.327 32-32 32H192c-17.673 0-32-14.327-32-32v-36.152c0-8.837 7.163-16 16-16h96v-64h-96c-8.837 0-16-7.163-16-16V128c0-8.837 7.163-16 16-16h224z" />
            </svg>
            Continuar Comprando
          </a>
        </div>
        <div id="summary" className="lg:w-1/4 px-8 py-10">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Resumen del Pedido
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cartItems?.length}
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
              <span>${(totalPrice + 10).toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 font-semibold hover:bg-blue-700 py-3 text-sm text-white uppercase w-full"
            >
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
