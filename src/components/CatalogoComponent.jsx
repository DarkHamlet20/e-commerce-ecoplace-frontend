import { useEffect, useState } from "react";
import axios from "axios";
import CardComponent from "./CardComponent";
import PaginationComponent from "../views/admin/components/PaginationComponent";
import SearchBarComponent from "../views/admin/components/SearchbarComponent";

const CatalogoComponent = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);
  const [searchTerm, setSearchTerm] = useState("");
  

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };
    cargarProductos();
  }, []);

  if (loading) {
    return (
      <div className="w-11/12">
        <p>Cargando productos...</p>
      </div>
    )
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  
  return (
    <main
      className="mb-8 z-10 relative"
    >
      <div className="w-[80%] mx-auto m-4 shadow-lg">
      <SearchBarComponent
            value={searchTerm}
            onChange={handleSearchChange}
          />
      </div>
      <div className="w-11/12">
        <h2 className="text-4xl font-bold my-5">Lista de Productos</h2>
        {/* <div className="grid gap-12 min-w-20 smm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 sm:items-center xl:grid-cols-4 transition-all">
          {products.map((product) => (
            <CardComponent
              key={product._id}
              id={product._id}
              productName={product.name}
              price={product.price}
              info={product.description}
              image={product.images[0]}
            />
          ))}
        </div> */}
        <div className="grid gap-12 min-w-20 smm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 sm:items-center xl:grid-cols-4 transition-all">
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

      </div>
      <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        {currentProducts.length === 0 && (
          <div className="text-center py-4">No se encontraron productos.</div>
        )}
    </main>

  );
};

export default CatalogoComponent