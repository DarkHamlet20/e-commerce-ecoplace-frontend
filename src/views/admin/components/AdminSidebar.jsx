import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faBoxOpen,
  faListCheck,
  faMoneyCheck,
  faThList,
  faEye,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import '../styles/AdminSidebar.css';
// import { ListGroup, Collapse } from 'react-bootstrap';


const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [activeMenu, setActiveMenu] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    {
      name: 'Categorías',
      icon: faThList,
      subMenu: [
        { name: 'Ver Categorías', icon: faEye, href: '/admin/categories/view' },
      ],
    },
    {
      name: 'Usuarios',
      icon: faUsers,
      subMenu: [
        { name: 'Ver Usuarios', icon: faEye, href: '/admin/users/view' },
      ],
    },
    {
      name: 'Productos',
      icon: faBoxOpen,
      subMenu: [
        { name: 'Ver Productos', icon: faEye, href: '/admin/products/view' },
      ],
    },
    {
      name: 'Órdenes',
      icon: faListCheck,
      subMenu: [
        { name: 'Ver Órdenes', icon: faEye, href: '/admin/orders/view' },
      ],
    },
    {
      name: 'Ventas',
      icon: faMoneyCheck,
      subMenu: [
        { name: 'Ver Ventas', icon: faEye, href: '/admin/sales/view' },
      ],
    },
  ];

  const handleMenuClick = (menuItem) => {
    if (menuItem.subMenu && menuItem.subMenu.length > 0) {
      setActiveMenu(menuItem.name === activeMenu ? '' : menuItem.name);
    } else {
      navigate(menuItem.href);
    }
  };

  return (
    <>
      <button className="menu-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`admin-sidebar ${isSidebarOpen ? '' : 'closed'}`}>
        <div className="sidebar-content">
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              <div
                className={`sidebar-item ${activeMenu === item.name ? 'active' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                <FontAwesomeIcon icon={item.icon} className="me-2" />
                {item.name}
              </div>
              {activeMenu === item.name && (
                <div className="sidebar-submenu">
                  {item.subMenu.map((subItem) => (
                    <div
                      key={subItem.name}
                      className="sidebar-subitem"
                      onClick={() => navigate(subItem.href)}
                    >
                      <FontAwesomeIcon icon={subItem.icon} className="me-2" />
                      {subItem.name}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;