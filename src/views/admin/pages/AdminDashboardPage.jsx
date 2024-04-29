import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingCart,
  faBox,
  faUsers,
  faTag,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Card } from 'react-bootstrap';
import AdminNavComponent from '../components/AdminNavComponent';
import AdminSidebar from '../components/AdminSidebar';
import AdminFooterComponent from '../components/AdminFooterComponent';
import axios from 'axios';

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
    fetchData(); // Obtener datos al cargar la página
  }, []);

  return (
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}> {/* Ajuste para el navbar fijo */}
      <div className="d-flex min-vh-100"> {/* Estructura principal */}
        <AdminSidebar /> {/* Sidebar */}
        <div className="flex-grow-1"> {/* Contenedor principal */}
          <AdminNavComponent /> {/* Navbar */}
          <div className="container mt-4"> {/* Espacio para el contenido */}
            <h1 className="text-center text-dark">Dashboard de Administración</h1>

            <Row> {/* Usa filas y columnas para la cuadrícula */}
              <Col md={4}> {/* Tarjeta para Ventas */}
                <Card className="bg-light text-center p-4">
                  <FontAwesomeIcon icon={faChartLine} size="3x" />
                  <h3>Ventas</h3>
                  <p>{salesCount}</p>
                </Card>
              </Col>
              {/* Tarjetas para Órdenes, Productos y otros elementos */}
              <Col md={4}>
                <Card className="bg-light text-center p-4">
                  <FontAwesomeIcon icon={faShoppingCart} size="3x" />
                  <h3>Órdenes</h3>
                  <p>{ordersCount}</p>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="bg-light text-center p-4">
                  <FontAwesomeIcon icon={faBox} size="3x" />
                  <h3>Productos</h3>
                  <p>{productsCount}</p>
                </Card>
              </Col>
            </Row>

            <Row className='mt-4'> {/* Segunda fila de tarjetas */}
              <Col md={6}>
                <Card className="bg-light text-center p-4">
                  <FontAwesomeIcon icon={faUsers} size="3x" />
                  <h3>Usuarios</h3>
                  <p>{usersCount}</p>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="bg-light text-center p-4">
                  <FontAwesomeIcon icon={faTag} size="3x" />
                  <h3>Categorías</h3>
                  <p>{categoriesCount}</p>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <AdminFooterComponent /> {/* Footer */}
    </div>
  );
};

export default AdminDashboardPage;
