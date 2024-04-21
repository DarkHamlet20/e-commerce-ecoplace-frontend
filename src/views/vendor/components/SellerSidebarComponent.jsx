import React, { useState } from 'react';
import { ListGroup, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faMoneyCheck, faEye } from '@fortawesome/free-solid-svg-icons';

const SellerSidebarComponent = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const navigate = useNavigate();

  const menuItems = [
    {
      name: 'Productos',
      icon: faBoxOpen,
      subMenu: [
        { name: 'Ver Productos', icon: faEye, href: '/seller/products/view' },
      ],
    },
    {
      name: 'Ventas',
      icon: faMoneyCheck,
      subMenu: [
        { name: 'Ver Ventas', icon: faEye, href: '/seller/sales/view' },
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
    <div className="bg-primary text-white flex-shrink-0" style={{ width: '250px', paddingTop: '20px' }}>
      <ListGroup variant="flush">
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            <ListGroup.Item
              className={`bg-primary text-white d-flex align-items-center ${activeMenu === item.name ? 'bg-secondary' : ''}`}
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
                    className="bg-primary text-white d-flex align-items-center"
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

export default SellerSidebarComponent;
