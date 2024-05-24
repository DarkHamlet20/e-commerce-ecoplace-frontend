import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import logo from '../../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp';

const AdminNavComponent = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({});
  const dropdownRef = useRef(null);
  const token = localStorage.getItem('auth_token');

  useEffect(() => {
    if (token) {
      axios
        .get('http://34.201.92.59:3000/users/me', { headers: { Authorization: `Bearer ${token}` } })
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
        'http://34.201.92.59:3000/users/logout',
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
        'http://34.201.92.59:3000/users/logout-all',
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

  const handleLogoClick = () => {
    navigate('/admin');
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-4 flex justify-between items-center shadow-lg relative">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={handleLogoClick}>
        <img src={logo} className="h-16" alt="EcoPlace Logo" />
        <span className="text-2xl font-semibold text-white animate-pulse">Admin Dashboard</span>
      </div>
      <div className="flex-grow mx-4 bg-gradient-to-r from-purple-500 to-purple-700 h-16 animate-background"></div>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-white text-3xl focus:outline-none"
        >
          <FontAwesomeIcon icon={faUserCircle} />
        </button>
        {showDropdown && (
          <div
            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
            ref={dropdownRef}
          >
            <div className="px-4 py-3 border-b">
              <span className="block text-sm text-gray-900">{userData.name} {userData.lastname}</span>
              <span className="block text-sm text-gray-500 truncate">{userData.email}</span>
            </div>
            <ul className="py-1">
              <li>
                <button
                  onClick={handleAccountClick}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Account
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogoutAllSessions}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out All Sessions
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavComponent;
