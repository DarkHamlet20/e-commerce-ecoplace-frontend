import { useEffect, useState } from 'react';
import axios from 'axios';
import CatalogoComponent from './CatalogoComponent';
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ecoplace.3.us-1.fl0.io/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {        
        console.error("Error al cargar los productos:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.error("No se encontro el token de autenticacion.");
      }
      await axios.post('https://ecoplace.3.us-1.fl0.io/users/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('auth_token');
      // Si la petición es exitosa, elimina el token de localStorage y llama a onLogout
      navigate('/login')
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar cualquier error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <div>
        <h1>Lista de Productos</h1>
        <div className="lista-productos">
          {products.map((product) => (
            <div key={product._id} className="producto">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Precio: ${product.price}</p>
              {/* Más detalles del producto como necesites */}
            </div>
          ))}
        </div>
      <CatalogoComponent />
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default HomePage;