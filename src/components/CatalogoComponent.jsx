import { useEffect, useState } from 'react'
import axios from 'axios'
import CardComponent from './CardComponent'

const CatalogoComponent = () => {
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
  }, [])

  if (loading) {
    return <p>Cargando productos...</p>;
  }


  return (

    <main className='w-[95%] mb-8 pt-24 z-10'>
      <div className="w-11/12">
        <h2 className='text-4xl font-bold my-5'>Lista de Productos</h2>
        <div className="grid gap-12 min-w-20 smm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 sm:items-center xl:grid-cols-4 transition-all">
          {products.map((product) => (
            <CardComponent
              key={product._id}
              id={product._id}
              productName={product.name}
              price={product.price}
              info={product.description} />
              
          ))}
        </div>
      </div>
    </main>

  );

}

export default CatalogoComponent