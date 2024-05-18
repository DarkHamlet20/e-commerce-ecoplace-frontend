import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminNavComponent from "../components/AdminNavComponent";
import AdminSidebar from "../components/AdminSidebar";
import PaginationComponent from "../../../common/PaginationComponent";
import SearchBarComponent from "../../../common/SearchbarComponent";
import AdminFooterComponent from "../components/AdminFooterComponent";
import '../styles/AdminSales.css';

const ADSEESalesPages = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage] = useState(2);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          "http://34.201.92.59:3000/sales/admin",
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
    <div className="sales-page-container">
      <div className="sales-content-container">
        <AdminSidebar />
        <div className="sales-main-content">
          <AdminNavComponent />
          <div className="sales-content-wrapper">
            <div className="sales-header">
              <h2 className="sales-title">Lista de Ventas</h2>
              <SearchBarComponent
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar ventas..."
                className="sales-search"
              />
              <Link to="/admin" className="sales-btn sales-btn-secondary">Regresar</Link>
            </div>
            <div className="sales-table-responsive">
              <table className="sales-table">
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
                    sale.items.map((item, index) => (
                      <tr key={`${sale._id}-${index}`}>
                        {index === 0 && (
                          <td rowSpan={sale.items.length}>
                            {sale.customer ? `${sale.customer.name} ${sale.customer.lastname}` : "Cliente no disponible"}
                          </td>
                        )}
                        <td>
                          {item.product?.seller
                            ? `${item.product.seller.name} ${item.product.seller.lastname}`
                            : "Vendedor no disponible"}
                        </td>
                        {index === 0 && (
                          <td rowSpan={sale.items.length}>{sale.status}</td>
                        )}
                        <td>
                          <div className="sales-product-details">
                            <div className="sales-product-card">
                              <p>Producto: {item.product?.name || "No disponible"}</p>
                              <p>Precio: ${item.product?.price || "0"}</p>
                              <p>Cantidad: {item.quantity}</p>
                              <p>Total: ${item.quantity * item.product?.price || "0"}</p>
                            </div>
                          </div>
                        </td>
                        {index === 0 && (
                          <td rowSpan={sale.items.length}>{new Date(sale.createdAt).toLocaleDateString()}</td>
                        )}
                      </tr>
                    ))
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
              onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default ADSEESalesPages;
