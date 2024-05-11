import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";
import PaginationComponent from "../common/PaginationComponent";
import SearchBarComponent from "../common/SearchbarComponent";

const CatalogoComponent = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15); // Puedes ajustar esto según tus necesidades
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const response = await axios.get(categoryId ? `http://34.201.92.59:3000/products/search?categories=${categoryId}` : "http://34.201.92.59:3000/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        setLoading(false);
      }
    };
    cargarProductos();
  }, [categoryId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Restablece a la primera página con nuevos términos de búsqueda
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular la paginación para los productos filtrados
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  if (loading) {
    return <div className="w-11/12">Cargando productos...</div>;
  }

  return (
    <main className="mb-8 z-10 w-full relative">
      <div className=" w-[80%] mx-auto m-4 shadow-lg">
        <SearchBarComponent
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="smm:w-11/12">
        <h2 className="text-4xl font-bold my-5">Lista de Productos</h2>
        <div className="transition-all flex flex-col gap-4">
          {currentProducts.map((product) => (
            <CardComponent
              key={product._id}
              id={product._id}
              productName={product.name}
              price={product.price}
              info={product.description}
              image={product.images[0]}
            />
          ))}
        </div>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {currentProducts.length === 0 && (
        <div className="text-center py-4">No se encontraron productos.</div>
      )}
    </main>
  );
};

export default CatalogoComponent;
