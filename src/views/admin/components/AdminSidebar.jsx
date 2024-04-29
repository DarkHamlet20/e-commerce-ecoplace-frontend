import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faBoxOpen,
  faListCheck,
  faMoneyCheck,
  faThList,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { ListGroup, Collapse } from 'react-bootstrap';

const AdminSidebar = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const navigate = useNavigate();

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
    <div
      className="bg-dark text-white"
      style={{ width: '250px', paddingTop: '20px', minHeight: '100vh' }}
    >
      <ListGroup variant="flush">
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            <ListGroup.Item
              className={`d-flex align-items-center ${
                activeMenu === item.name ? 'bg-secondary' : ''
              }`}
              onClick={() => handleMenuClick(item)}
            >
              <FontAwesomeIcon icon={item.icon} className="me-2" />
              {item.name}
            </ListGroup.Item>
            <Collapse in={activeMenu === item.name}>
              <div className="ms-3">
                {item.subMenu.map((subItem) => (
                  <ListGroup.Item
                    key={subItem.name}
                    className="bg-dark text-white"
                    onClick={() => navigate(subItem.href)}
                  >
                    <FontAwesomeIcon icon={subItem.icon} className="me-2" />
                    {subItem.name}
                  </ListGroup.Item>
                ))}
              </div>
            </Collapse>
          </React.Fragment>
        ))}
      </ListGroup>
    </div>
  );
};

export default AdminSidebar;
