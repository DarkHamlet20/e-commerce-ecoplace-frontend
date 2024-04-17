import React, { useState, useEffect } from "react";
import axios from "axios";
import PaginationComponent from "../../../common/PaginationComponent";
import SearchBarComponent from "../../../common/SearchbarComponent";
import { useNavigate } from "react-router-dom";

const SellerSalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [salesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    const fetchSales = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/sales/seller", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSales(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sales:", error);
        setLoading(false);
      }
    };

    fetchSales();
  }, [token]);

  const filteredSales = sales.filter((sale) =>
    sale.items.some((item) =>
      item.product?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Lógica de paginación
  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return <p>Cargando ventas...</p>;
  }

  // Cambiar la página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      <button className="mt-4" onClick={() => navigate("/seller")}>
        Regresar
      </button>
      <div className="overflow-x-auto">
        <SearchBarComponent
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar ventas..."
        />
        {loading ? (
          <div>Cargando...</div>
        ) : (
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {currentSales.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-100">
                  <td className="p-4">
                    <div>
                      <p>
                        {sale.customer
                          ? `${sale.customer?.name} ${sale.customer?.lastname}`
                          : "Cliente no disponible"}
                      </p>
                    </div>
                  </td>
                  <td className="p-4">
                    {sale.items.map((item, index) => (
                      <div key={index}>
                        <p>
                          {item.product?.seller
                            ? `
                          ${item.product?.seller?.name}
                          ${item.product?.seller?.lastname}
                          `
                            : "Vendedor no disponible"}
                        </p>
                      </div>
                    ))}
                  </td>
                  <td className="p-4">{sale.status}</td>
                  <td className="p-4">
                    <ul>
                      {sale.items.map((item, index) => (
                        <li key={index}>
                          <p>{item.product?.name}</p>
                          <p>Precio: {item.product?.price}</p>
                          <p>Cantidad: {item.quantity}</p>
                          <p>Total: {item.quantity * item.product?.price}</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4">
                    {new Date(sale.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={Math.ceil(filteredSales.length / salesPerPage)}
        onPageChange={paginate}
      />
      {currentSales.length === 0 && (
        <div className="text-center py-4">No se encontraron ventas.</div>
      )}
    </div>
  );
};

export default SellerSalesPage;
