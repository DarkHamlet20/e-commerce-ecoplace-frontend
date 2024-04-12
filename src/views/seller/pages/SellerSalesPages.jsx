import React, { useState, useEffect } from "react";
import axios from "axios";
import SellerSalesList from "../components/SellerSalesList"; // Asumiendo que así llamas al componente que lista las ventas

const SellerSalesPage = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const response = await axios.get("http://localhost:3000/products/seller", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });
      setSales(response.data);
    };

    fetchSales();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-2xl font-semibold leading-tight">Mis Ventas</h2>
          {/* Aquí irá el componente SellerSalesList que importamos */}
          <SellerSalesList sales={sales} />
        </div>
      </div>
    </div>
  );
};

export default SellerSalesPage;
