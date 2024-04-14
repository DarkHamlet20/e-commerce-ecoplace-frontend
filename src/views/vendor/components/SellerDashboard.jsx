import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBoxOpen,
  faEye,
  faListCheck,
  faMoneyCheck,
} from '@fortawesome/free-solid-svg-icons';

const SellerDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const navigate = useNavigate();

  const menuItems = [
    {
      name: 'Productos',
      icon: faBoxOpen,
      href: '/seller/products',
      subMenu: [
        { name: 'Ver Productos', icon: faEye, href: '/seller/products/view' },
      ],
    },
    {
      name: 'Orders',
      icon: faListCheck,
      href: '/seller/orders',
      subMenu: [
        { name: 'Ver Ordenes', icon: faEye, href: '/seller/orders/view' },
      ],
    },
    {
      name: 'Ventas',
      icon: faMoneyCheck,
      href: '/seller/sales',
      subMenu: [
        { name: 'Ver Ventas', icon: faEye, href: '/seller/sales/view' },
      ],
    },
    // ... más menús ...
  ];

  const handleMenuClick = (menuItem) => {
    if (menuItem.subMenu && menuItem.subMenu.length > 0) {
      setActiveMenu(menuItem.name === activeMenu ? '' : menuItem.name);
    } else {
      navigate(menuItem.href);
    }
  };

  return (
    <div className="w-64 h-full bg-gray-900 text-white flex flex-col">
      <div className="flex items-center justify-center mt-10 mb-5">
        {/* Logo o Imagen */}
      </div>
      <aside className="flex-grow">
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            <button
              onClick={() => handleMenuClick(item)}
              className={`flex items-center p-2 w-full text-left hover:bg-gray-700 focus:outline-none transition-colors duration-150 ${
                activeMenu === item.name ? 'bg-gray-800' : ''
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-3 text-lg" />
              {item.name}
            </button>
            {activeMenu === item.name && item.subMenu.length > 0 && (
              <div className="pl-4">
                {item.subMenu.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => navigate(sub.href)}
                    className="flex items-center p-2 w-full text-left text-sm hover:bg-blue-800 focus:outline-none transition-colors duration-150"
                  >
                    <FontAwesomeIcon icon={sub.icon} className="mr-3 text-sm" />
                    {sub.name}
                  </button>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </aside>
    </div>
  );
};

export default SellerDashboard;
