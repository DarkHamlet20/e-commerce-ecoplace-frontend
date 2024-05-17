import React from "react";
import { useNavigate } from "react-router-dom";

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
      className="cursor-pointer flex mx-auto items-center flex-col md:flex-row h-88 min-h-88 max-h-88 md:h-60 border w-72 md:w-full text-black shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <picture className="md:border-r h-48 md:h-full min-w-48 max-w-48 md:min-w-72 md:max-w-72 p-2">
        <img
          src={image || defaultImage}
          className="w-full h-full object-contain"
          alt={`${productName} image`}
        />
      </picture>
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-2xl capitalize">{productName}</h1>
          <p>{info.length > 50 ? info.slice(0, 100) + "..." : info}</p>
        </div>
        <p className="text-2xl">${price}</p>
      </div>
    </div>
  );
};

export default CardComponent;
