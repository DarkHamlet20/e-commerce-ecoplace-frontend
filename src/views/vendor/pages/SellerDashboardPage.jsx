import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBox, faChartLine } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import SellerLayout from '../components/SellerLayout';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';


const SellerDashboardPage = () => {
  const [salesCount, setSalesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [mostSold, setMostSold] = useState([]);
  const [leastSold, setLeastSold] = useState([]);
  const [highestPriceSold, setHighestPriceSold] = useState([]);
  const [lowestPriceSold, setLowestPriceSold] = useState([]);

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const [salesResponse, productsResponse, statsResponse] = await Promise.all([
        axios.get('http://34.201.92.59:3000/stats/client/products-sold', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://34.201.92.59:3000/stats/client/products-created', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://34.201.92.59:3000/stats/client/product-sales-stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setSalesCount(salesResponse.data.totalProductsSold);
      setProductsCount(productsResponse.data.totalProductsCreated);
      setMostSold(statsResponse.data.mostSold);
      setLeastSold(statsResponse.data.leastSold);
      setHighestPriceSold(statsResponse.data.highestPriceSold);
      setLowestPriceSold(statsResponse.data.lowestPriceSold);
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
          <FontAwesomeIcon icon={faBox} className="text-green-600 mb-4" size="3x" />
          <h3 className="text-xl font-bold">Productos</h3>
          <p className="text-2xl">{productsCount}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-8 mb-4">Estadísticas de Productos</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Productos Más Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mostSold}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Productos Menos Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={leastSold}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Productos de Mayor Precio Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={highestPriceSold}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Productos de Menor Precio Vendidos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lowestPriceSold}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </SellerLayout>
  );
};

export default SellerDashboardPage;
