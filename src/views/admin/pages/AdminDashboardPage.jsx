import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faBox,
  faUsers,
  faTag,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
// import { Row, Col, Card } from 'react-bootstrap';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import AdminFooterComponent from '../components/AdminFooterComponent';
import axios from 'axios';
import '../styles/AdminDashboardPage.css'

const AdminDashboardPage = () => {
  const [salesCount, setSalesCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);

  const fetchData = async () => {
    const token = localStorage.getItem('auth_token');
    try {
      const [sales, orders, products, users, categories] = await Promise.all([
        axios.get('http://localhost:3000/stats/sales/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:3000/stats/orders/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:3000/stats/products/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:3000/stats/users/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://localhost:3000/stats/categories/count', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setSalesCount(sales.data.count);
      setOrdersCount(orders.data.count);
      setProductsCount(products.data.count);
      setUsersCount(users.data.count);
      setCategoriesCount(categories.data.count);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <AdminNavComponent />
        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard de Administración</h1>
          <div className="stats-container">
            <div className="stat-card">
              <FontAwesomeIcon icon={faChartLine} className='text-white' size="3x" />
              <h3>Ventas</h3>
              <p>{salesCount}</p>
            </div>
            <div className="stat-card">
              <FontAwesomeIcon icon={faShoppingCart} className='text-white'  size="3x" />
              <h3>Órdenes</h3>
              <p>{ordersCount}</p>
            </div>
            <div className="stat-card">
              <FontAwesomeIcon icon={faBox} className='text-white'  size="3x" />
              <h3>Productos</h3>
              <p>{productsCount}</p>
            </div>
            <div className="stat-card">
              <FontAwesomeIcon icon={faUsers} className='text-white'  size="3x" />
              <h3>Usuarios</h3>
              <p>{usersCount}</p>
            </div>
            <div className="stat-card">
              <FontAwesomeIcon icon={faTag} className='text-white'  size="3x" />
              <h3>Categorías</h3>
              <p>{categoriesCount}</p>
            </div>
          </div>
        </div>
      </div>
      <AdminFooterComponent />
    </div>
  );
};

export default AdminDashboardPage;