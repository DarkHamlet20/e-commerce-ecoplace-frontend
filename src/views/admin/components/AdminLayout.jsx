import React, { useState } from 'react';
import AdminNavComponent from './AdminNavComponent';
import AdminSidebar from './AdminSidebar';
import AdminFooterComponent from './AdminFooterComponent';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavComponent toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <AdminFooterComponent />
      </div>
    </div>
  );
};

export default AdminLayout;
