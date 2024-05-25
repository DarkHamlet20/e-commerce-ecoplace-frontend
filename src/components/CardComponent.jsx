import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Global.css';

const CardComponent = ({ productName, id, price, info, image }) => {
  const defaultImage =
    "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      id={id}
      onClick={handleClick}
      className="cursor-pointer flex flex-col border p-4 w-full h-full shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
    >
      <picture className="h-48 w-full mb-4">
        <img
          src={image || defaultImage}
          className="w-full h-full object-contain"
          alt={`${productName} image`}
        />
      </picture>
      <div>
        <h1 className="text-xl font-bold mb-2">{productName}</h1>
        <p className="text-gray-700 mb-4">{info.length > 50 ? info.slice(0, 50) + "..." : info}</p>
        <p className="text-lg font-semibold text-green-600">${price}</p>
      </div>
    </div>
  );
};

export default CardComponent;
