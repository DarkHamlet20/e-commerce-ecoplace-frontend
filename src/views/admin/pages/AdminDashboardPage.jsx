import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faBox,
  faUsers,
  faTag,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import AdminFooterComponent from '../components/AdminFooterComponent';
import axios from 'axios';
import Chart from 'chart.js/auto';

const AdminDashboardPage = () => {
  const [salesCount, setSalesCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [mostSold, setMostSold] = useState([]);
  const [leastSold, setLeastSold] = useState([]);
  const [highestPriceSold, setHighestPriceSold] = useState([]);
  const [lowestPriceSold, setLowestPriceSold] = useState([]);
  const [dailySalesStats, setDailySalesStats] = useState([]);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const [sales, orders, products, users, categories, productStats] = await Promise.all([
        axios.get('http://34.201.92.59:3000/stats/sales/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://34.201.92.59:3000/stats/orders/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://34.201.92.59:3000/stats/products/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://34.201.92.59:3000/stats/users/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://34.201.92.59:3000/stats/categories/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://34.201.92.59:3000/stats/admin/product-sales-stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setSalesCount(sales.data.count);
      setOrdersCount(orders.data.count);
      setProductsCount(products.data.count);
      setUsersCount(users.data.count);
      setCategoriesCount(categories.data.count);
      setMostSold(productStats.data.mostSold);
      setLeastSold(productStats.data.leastSold);
      setHighestPriceSold(productStats.data.highestPriceSold);
      setLowestPriceSold(productStats.data.lowestPriceSold);
      setDailySalesStats(productStats.data.dailySalesStats);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dailySalesStats.map(stat => stat.date),
        datasets: [{
          label: 'Ventas diarias',
          data: dailySalesStats.map(stat => stat.count),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }, [dailySalesStats]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1">
        <AdminSidebar />
        <div className="flex flex-col flex-1">
          <AdminNavComponent />
          <div className="flex-grow p-6 overflow-auto">
            <h1 className="text-2xl font-bold mb-4">Dashboard de Administración</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                <FontAwesomeIcon icon={faChartLine} className="text-purple-600 mb-4" size="3x" />
                <h3 className="text-xl font-bold">Ventas</h3>
                <p className="text-2xl">{salesCount}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                <FontAwesomeIcon icon={faShoppingCart} className="text-purple-600 mb-4" size="3x" />
                <h3 className="text-xl font-bold">Órdenes</h3>
                <p className="text-2xl">{ordersCount}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                <FontAwesomeIcon icon={faBox} className="text-purple-600 mb-4" size="3x" />
                <h3 className="text-xl font-bold">Productos</h3>
                <p className="text-2xl">{productsCount}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                <FontAwesomeIcon icon={faUsers} className="text-purple-600 mb-4" size="3x" />
                <h3 className="text-xl font-bold">Usuarios</h3>
                <p className="text-2xl">{usersCount}</p>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                <FontAwesomeIcon icon={faTag} className="text-purple-600 mb-4" size="3x" />
                <h3 className="text-xl font-bold">Categorías</h3>
                <p className="text-2xl">{categoriesCount}</p>
              </div>
            </div>

            <div className="my-6">
              <h2 className="text-xl font-bold mb-4">Ventas Diarias</h2>
              <canvas id="dailySalesChart" ref={chartRef}></canvas>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Productos más vendidos</h3>
                <ul>
                  {mostSold.map(product => (
                    <li key={product.name} className="mb-2">
                      <span className="font-bold">{product.name}</span> - {product.sold} vendidos
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Productos menos vendidos</h3>
                <ul>
                  {leastSold.map(product => (
                    <li key={product.name} className="mb-2">
                      <span className="font-bold">{product.name}</span> - {product.sold} vendidos
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Productos más caros vendidos</h3>
                <ul>
                  {highestPriceSold.map(product => (
                    <li key={product.name} className="mb-2">
                      <span className="font-bold">{product.name}</span> - ${product.price}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Productos más baratos vendidos</h3>
                <ul>
                  {lowestPriceSold.map(product => (
                    <li key={product.name} className="mb-2">
                      <span className="font-bold">{product.name}</span> - ${product.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default AdminDashboardPage;
