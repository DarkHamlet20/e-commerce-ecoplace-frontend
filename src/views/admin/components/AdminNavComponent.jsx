import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
// import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import '../styles/AdminNav.css';
import axios from 'axios';
import logo from '../../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp';

const AdminNavComponent = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({});
  const dropdownRef = useRef(null);
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (token) {
      axios
        .get('https://34.201.92.59/users/me', { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setUserData(response.data))
        .catch((error) => console.error('Error obteniendo datos del usuario:', error));
    }
  }, [token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleAccountClick = () => {
    navigate('/admin/account');
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        'https://34.201.92.59/users/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem('auth_token');
      localStorage.removeItem('userRole');
      navigate('/login');
    } catch (error) {
      console.error('Error cerrando todas las sesiones:', error);
    }
  };

  return (
    <div className="admin-nav">
      <div className="nav-logo" onClick={() => navigate('/admin')}>
        <img src={logo} alt="Admin Logo" />
        <span>Admin Dashboard</span>
      </div>
      <div className="nav-user" ref={dropdownRef}>
        <div className="user-info">
          <span>{userData.name} {userData.lastname}</span>
          <span>{userData.email}</span>
        </div>
        <div className="dropdown">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </button>
          <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
            <button onClick={handleAccountClick}>Account</button>
            <button onClick={handleLogout}>Sign Out</button>
            <button onClick={handleLogoutAllSessions}>Sign Out All Sessions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavComponent;