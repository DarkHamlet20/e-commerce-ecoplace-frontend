import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../common/PaginationComponent";
import SellerNavComponent from "../components/SellerNavComponent";
import SellerSidebarComponent from "../components/SellerSidebarComponent";
import SellerFooterComponent from "../components/SellerFooterComponent";
import SearchBarComponent from "../../../common/SearchbarComponent";

const SLSEEProductsPages = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://ecoplace-api.zeabur.app/products/seller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="d-flex flex-column" style={{ marginTop: "60px" }}>
      <div className="d-flex min-vh-100">
        <SellerSidebarComponent />
        <div className="flex-grow-1">
          <SellerNavComponent />
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Gestión de Productos</h2>
              <div>
                <Link to="/seller" className="btn btn-info me-2">
                  Regresar
                </Link>
                <Link to="/seller/products/add" className="btn btn-primary">
                  Agregar Producto
                </Link>
              </div>
            </div>
            <SearchBarComponent
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar productos..."
            />
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr className="bg-info text-white">
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.length > 0 ? (
                    currentProducts.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="rounded-circle"
                              style={{
                                height: "40px",
                                width: "40px",
                                marginRight: "10px",
                              }}
                            />
                            {product.name}
                          </div>
                        </td>
                        <td>${product.price}</td>
                        <td>
                          {product.categories
                            .map((cat) => cat.categoryName)
                            .join(", ")}
                        </td>
                        <td>{product.countInStock}</td>
                        <td>
                          <Link
                            to={`/seller/products/edit/${product._id}`}
                            className="btn btn-warning me-2"
                          >
                            Actualizar
                          </Link>
                          <Link
                            to={`/seller/products/delete/${product._id}`}
                            className="btn btn-danger"
                          >
                            Eliminar
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No se encontraron productos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SLSEEProductsPages;
