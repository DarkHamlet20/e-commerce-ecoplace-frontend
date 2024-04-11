import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faUsers,
  faTags,
  faShoppingCart,
  faBoxOpen,
  faMoneyBillWave,
  faPlus,
  faEdit,
  faTrashAlt,
  faEye,
} from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState('');
  const navigate = useNavigate();

  const menuItems = [
    {
      name: 'Dashboard',
      icon: faChartPie,
      href: '/admin/dashboard',
      subMenu: [],
    },
    {
      name: 'Usuarios',
      icon: faUsers,
      href: '/admin/users',
      subMenu: [
        { name: 'Agregar Usuario', icon: faPlus, href: '/admin/users/add' },
        { name: 'Editar Usuario', icon: faEdit, href: '/admin/users/edit' },
        { name: 'Eliminar Usuario', icon: faTrashAlt, href: '/admin/users/delete' },
        { name: 'Ver Usuario', icon: faEye, href: '/admin/users/see' },
      ],
    },
    // ... más menús ...
    {
      name: 'Productos',
      icon: faBoxOpen,
      href: '/admin/products',
      subMenu: [
        { name: 'Agregar Producto', icon: faPlus, href: '/admin/products/add' },
        { name: 'Editar Producto', icon: faEdit, href: '/admin/products/edit' },
        { name: 'Eliminar Producto', icon: faTrashAlt, href: '/admin/products/delete' },
        { name: 'Ver Producto', icon: faEye, href: '/admin/products/view' },
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
    <div className="w-64 h-full bg-blue-700 text-white flex flex-col">
      <div className="flex items-center justify-center mt-10 mb-5">
        {/* Logo o Imagen */}
      </div>
      <nav className="flex-grow">
        {menuItems.map((item) => (
          <React.Fragment key={item.name}>
            <button
              onClick={() => handleMenuClick(item)}
              className={`flex items-center p-2 w-full text-left hover:bg-blue-800 focus:outline-none transition-colors duration-150 ${
                activeMenu === item.name ? 'bg-blue-800' : ''
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
      </nav>
    </div>
  );
};

export default AdminDashboard;
