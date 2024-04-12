import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ADSEESalesPages = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/sales/admin", // Asegúrate de ajustar la URL según tu configuración
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
          }
        );
        setSales(response.data);
      } catch (error) {
        console.error("Error fetching sales", error);
      }
    };

    fetchSales();
  }, []);

  function formatDate(dateString) {
    if (!dateString) return "Fecha no disponible";

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    return new Date(dateString).toLocaleDateString("es", options);
  }

  return (
    <div className="min-h-screen bg-blue-900 flex justify-center items-center px-6 py-8">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Lista de Ventas
          </h2>
          <Link
            to="/admin"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Regresar
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Vendedor
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Detalles del Producto
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fecha de Venta
                </th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-100">
                  <td className="p-4">
                    {sale.customer && (
                      <div>
                        <p>
                          {sale.customer?.name} {sale.customer?.lastname}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    {sale.items.map((item, index) => (
                      <div key={index}>
                        <p>
                          {item.product?.seller?.name}{" "}
                          {item.product?.seller?.lastname}
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
        </div>
        {sales.length === 0 && (
          <div className="text-center py-4">No se encontraron ventas.</div>
        )}
      </div>
    </div>
  );
};

export default ADSEESalesPages;
