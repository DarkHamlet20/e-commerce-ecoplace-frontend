import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import logo from '../../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp';

const SellerNavComponent = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (token) {
      axios
        .get('https://34.201.92.59/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error('Error obteniendo datos del usuario:', error));
    }
  }, [token]);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://34.201.92.59/users/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userRole');
      navigate('/login');
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error);
    }
  };

  const handleLogoutAllSessions = async () => {
    try {
      await axios.post(
        'https://34.201.92.59/users/logout-all',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userRole');
      navigate('/login');
    } catch (error) {
      console.error('Error cerrando todas las sesiones:', error);
    }
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top" style={{ padding: '0.5rem 1rem', zIndex: 1000 }}>
      <Navbar.Brand onClick={() => navigate('/seller')} className="d-flex align-items-center">
        <Image src={logo} roundedCircle width="40" height="40" alt="Seller Logo" />
        <span className="ms-2 cursor-pointer">Seller Dashboard</span>
      </Navbar.Brand>
      <Nav className="ms-auto">
        <div className="d-flex flex-column justify-content-center align-items-end mr-9"> {/* Mostrar el nombre y el correo del vendedor */}
          <span className="text-white">{userData.name} {userData.lastname}</span>
          <span className="text-white">{userData.email}</span>
        </div>
        <Dropdown align="end" show={showDropdown} onToggle={toggleDropdown}>
          <Dropdown.Toggle variant="secondary" id="user-menu-toggle">
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate('/seller/account')}>Account</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Cerrar Sesión</Dropdown.Item>
            <Dropdown.Item onClick={handleLogoutAllSessions}>Cerrar Todas las Sesiones</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default SellerNavComponent;
