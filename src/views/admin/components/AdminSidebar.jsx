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

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [activeMenu, setActiveMenu] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
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
      subMenu: [{ name: 'Ver Categorías', icon: faEye, href: '/admin/categories/view' }],
    },
    {
      name: 'Usuarios',
      icon: faUsers,
      subMenu: [{ name: 'Ver Usuarios', icon: faEye, href: '/admin/users/view' }],
    },
    {
      name: 'Productos',
      icon: faBoxOpen,
      subMenu: [{ name: 'Ver Productos', icon: faEye, href: '/admin/products/view' }],
    },
    {
      name: 'Órdenes',
      icon: faListCheck,
      subMenu: [{ name: 'Ver Órdenes', icon: faEye, href: '/admin/orders/view' }],
    },
    {
      name: 'Ventas',
      icon: faMoneyCheck,
      subMenu: [{ name: 'Ver Ventas', icon: faEye, href: '/admin/sales/view' }],
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
    <div className={`bg-white shadow-lg min-h-screen flex flex-col ${isSidebarOpen ? 'w-60' : 'w-16'} transition-width duration-300`}>
      <button className="text-gray-500 p-4" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>
      <div className={`flex-grow overflow-y-auto ${isSidebarOpen ? 'space-y-4 p-4' : 'flex flex-col items-center space-y-2'}`}>
        {menuItems.map((item) => (
          <div key={item.name} className="w-full group">
            <div
              className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${activeMenu === item.name ? 'bg-purple-200' : ''}`}
              onClick={() => handleMenuClick(item)}
            >
              <FontAwesomeIcon icon={item.icon} className="text-purple-600" />
              {isSidebarOpen && <span className="ml-3 text-gray-700">{item.name}</span>}
            </div>
            {activeMenu === item.name && (
              <div className={`${isSidebarOpen ? 'ml-6' : 'w-full text-center'} space-y-2`}>
                {item.subMenu.map((subItem) => (
                  <div
                    key={subItem.name}
                    className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-purple-100 ${isSidebarOpen ? '' : 'justify-center'}`}
                    onClick={() => navigate(subItem.href)}
                  >
                    <FontAwesomeIcon icon={subItem.icon} className="text-purple-600" />
                    {isSidebarOpen && <span className="ml-3 text-gray-600">{subItem.name}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
