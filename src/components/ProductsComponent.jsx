import React,{useState, useEffect} from 'react'
import axios from 'axios';

const ProductCard = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get('https://ecoplace.3.us-1.fl0.io/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    }
    cargarProductos();
  },[])

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="productos">
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
    </div>
  );
}

export default ProductCard