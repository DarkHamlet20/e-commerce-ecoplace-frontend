import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import PaginationComponent from "../../../common/PaginationComponent";
import SearchBarComponent from "../../../common/SearchbarComponent";
import AdminFooterComponent from "../components/AdminFooterComponent";

const ADSEESalesPages = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage] = useState(2);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          "https://ecoplace-api.zeabur.app/sales/admin",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setSales(response.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSales = sales.filter(
    (sale) =>
      sale.customer &&
      `${sale.customer?.name} ${sale.customer?.lastname}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  return (
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}>
      <div className="d-flex min-vh-100">
        <AdminSidebar />
        <div className="flex-grow-1">
          <AdminNavComponent />
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="text-dark">Lista de Ventas</h2>
              <SearchBarComponent
                value={searchTerm} // Valor del término de búsqueda
                onChange={handleSearchChange} // Controlador de cambio
                placeholder="Buscar ventas..." // Placeholder de búsqueda
              />
              <Link
                to="/admin"
                className="btn btn-secondary"
              >
                Regresar
              </Link>
            </div>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Vendedor</th>
                    <th>Status</th>
                    <th>Productos</th>
                    <th>Fecha de Venta</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSales.map((sale) => (
                    <tr key={sale._id}>
                      <td>{sale.customer ? `${sale.customer.name} ${sale.customer.lastname}` : "Cliente no disponible"}</td>
                      <td>
                        {sale.items.map((item, index) => (
                          <div key={index}>
                            {item.product?.seller
                              ? `${item.product.seller.name} ${item.product.seller.lastname}`
                              : "Vendedor no disponible"}
                          </div>
                        ))}
                      </td>
                      <td>{sale.status}</td>
                      <td>
                        <div className="d-flex flex-wrap">
                          {sale.items.map((item, index) => (
                            <div key={index} className="border p-2 m-2 rounded">
                              <p>Producto: {item.product?.name || "No disponible"}</p>
                              <p>Precio: ${item.product?.price || "0"}</p>
                              <p>Cantidad: {item.quantity}</p>
                              <p>Total: ${item.quantity * item.product?.price || "0"}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>{new Date(sale.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                  {currentSales.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">No se encontraron ventas.</td>
                      </tr>
                  )}
                </tbody>
              </table>
            </div>
            <PaginationComponent
              currentPage={currentPage}
              totalPages={Math.ceil(filteredSales.length / salesPerPage)}
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)} // Cambiar página
            />
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADSEESalesPages;
