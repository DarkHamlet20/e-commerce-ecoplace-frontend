import React from 'react';
import SellerNavComponent from '../components/SellerNavComponent';
import SellerSidebarComponent from '../components/SellerSidebarComponent';
import SellerFooterComponent from '../components/SellerFooterComponent';
import '../styles/SellerDashboard.css';

const SellerDashboardPage = () => {
  return (
    <div className="seller-dashboard">
      <SellerNavComponent />
      <div className="dashboard-content">
        <SellerSidebarComponent />
        <div className="main-content">
          <h1>Bienvenido al Panel del Vendedor</h1>
          {/* Contenido del dashboard del vendedor */}
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SellerDashboardPage;
