import React, { useState } from 'react';
import { ListGroup, Collapse } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faMoneyCheck, faEye } from '@fortawesome/free-solid-svg-icons';
import shadows from '@mui/material/styles/shadows';

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

  const [show, setShow] = useState(false)

  return (
    <>
    <h3 className='cursor-pointer absolute block md:hidden mt-4 pl-3 z-40' onClick={() => setShow(!show)}>Acciones</h3>
    <div className={`${show ? 'scale-0' : 'scale-100'} md:scale-100 bg-primary absolute md:static min-h-full text-white flex-shrink-0 w-52`}>
    
      <div className={` mt-20 md:mt-4 w-48 md:w-full absolute md:static z-30`}>
      <ListGroup variant="flush">
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            
            <ListGroup.Item
              className={`bg-primary cursor-pointer text-white d-flex align-items-center ${activeMenu === item.name ? 'bg-secondary' : ''}`}
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
                    className="bg-primary cursor-pointer text-white d-flex align-items-center"
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
    </div>
    </>
  );
};

export default SellerSidebarComponent;
