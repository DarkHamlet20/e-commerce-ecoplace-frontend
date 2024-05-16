import React, { useState, useEffect } from 'react';
import { ListGroup, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faMoneyCheck, faEye, faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/SellerSidebar.css';

const SellerSidebarComponent = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const [show, setShow] = useState(false);
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

  useEffect(() => {
    if (!show) {
      setActiveMenu('');
    }
  }, [show]);

  return (
    <>
      <FontAwesomeIcon icon={faBars} className="sidebar-toggle" onClick={() => setShow(!show)} />
      <div className={`overlay ${show ? 'show' : ''}`} onClick={() => setShow(false)}></div>
      <div className={`seller-sidebar ${show ? 'show' : ''}`}>
        <ListGroup variant="flush">
          {menuItems.map((item) => (
            <React.Fragment key={item.name}>
              <ListGroup.Item
                className={`menu-item ${activeMenu === item.name ? 'active' : ''}`}
                onClick={() => handleMenuClick(item)}
              >
                <FontAwesomeIcon icon={item.icon} className="me-2" />
                {item.name}
              </ListGroup.Item>
              <Collapse in={activeMenu === item.name}>
                <div className="submenu">
                  {item.subMenu.map((subItem) => (
                    <ListGroup.Item
                      key={subItem.name}
                      className="submenu-item"
                      onClick={() => {
                        navigate(subItem.href);
                        setShow(false); // Cierra el sidebar al hacer clic en un subitem
                      }}
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
    </>
  );
};

export default SellerSidebarComponent;
