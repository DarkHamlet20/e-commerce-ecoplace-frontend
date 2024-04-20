import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Navbar, Nav, Dropdown, Image } from 'react-bootstrap';
import logo from '../../../../public/img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp';

const AdminNavComponent = ({ handleLogout, handleLogoutAllSessions }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleAccountClick = () => {
    navigate('/admin/account');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" style={{ padding: '0.5rem 1rem', zIndex: 1000 }}>
      <Navbar.Brand onClick={() => navigate('/admin')} className="d-flex align-items-center">
        <Image
          src={logo}
          roundedCircle
          width="40"
          height="40"
          alt="Admin Logo"
        />
        <span className="ms-2">Admin Dashboard</span>
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Dropdown align="end" show={showDropdown} onToggle={toggleDropdown}>
          <Dropdown.Toggle variant="secondary" id="user-menu-toggle">
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleAccountClick}>Account</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
            <Dropdown.Item onClick={handleLogoutAllSessions}>
              Sign Out All Sessions
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};

export default AdminNavComponent;
