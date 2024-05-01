import React from 'react';
import SellerNavComponent from '../components/SellerNavComponent';
import SellerSidebarComponent from '../components/SellerSidebarComponent';
import SellerFooterComponent from '../components/SellerFooterComponent';

const SellerDashboardPage = () => {
  return (
    <div className="d-flex flex-column" style={{ marginTop: '60px' }}> {/* Ajuste para el navbar */}
      <div className="d-flex min-vh-100"> {/* Estructura principal */}
        <SellerSidebarComponent /> {/* Sidebar */}
        <div className="flex-grow-1"> {/* Contenedor principal */}
          <SellerNavComponent /> {/* Navbar */}
          <div className="container mt-4"> {/* Espacio para el contenido */}
            <h1 className="text-dark">Bienvenido al Panel del Vendedor</h1> {/* Mensaje de bienvenida */}
            {/* Aquí irá el contenido del dashboard del vendedor */}
          </div>
        </div>
      </div>
      <SellerFooterComponent />
    </div>
  );
};

export default SellerDashboardPage;
