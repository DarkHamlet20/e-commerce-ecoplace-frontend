import React, { useState } from 'react';
import SellerNavComponent from './SellerNavComponent';
import SellerSidebar from './SellerSidebarComponent';
import SellerFooterComponent from './SellerFooterComponent';

const SellerLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SellerSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SellerNavComponent toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
        <SellerFooterComponent />
      </div>
    </div>
  );
};

export default SellerLayout;
