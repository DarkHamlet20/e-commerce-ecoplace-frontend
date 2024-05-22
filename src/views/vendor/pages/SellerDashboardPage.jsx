import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faBox,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SellerLayout from '../components/SellerLayout';

const SellerDashboardPage = () => {
  const [salesCount, setSalesCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const [sales, orders, products] = await Promise.all([
        axios.get('http://34.201.92.59:3000/stats/sales/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://34.201.92.59:3000/stats/orders/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://34.201.92.59:3000/stats/products/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setSalesCount(sales.data.count);
      setOrdersCount(orders.data.count);
      setProductsCount(products.data.count);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SellerLayout>
      <h1 className="text-2xl font-bold mb-4">Dashboard de Vendedor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FontAwesomeIcon icon={faChartLine} className="text-green-600 mb-4" size="3x" />
          <h3 className="text-xl font-bold">Ventas</h3>
          <p className="text-2xl">{salesCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FontAwesomeIcon icon={faShoppingCart} className="text-green-600 mb-4" size="3x" />
          <h3 className="text-xl font-bold">Órdenes</h3>
          <p className="text-2xl">{ordersCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
          <FontAwesomeIcon icon={faBox} className="text-green-600 mb-4" size="3x" />
          <h3 className="text-xl font-bold">Productos</h3>
          <p className="text-2xl">{productsCount}</p>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboardPage;
