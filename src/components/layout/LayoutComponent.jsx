import React from 'react';
import HeaderComponent from "./HeaderComponent";
import NavComponent from "./NavComponent";
import FooterComponent from "./FooterComponent";
import { Sidebar } from './Sidebar';

// 'children' debe ser desestructurado del objeto props.
const LayoutComponent = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <NavComponent />
      <Sidebar />
      <main className="flex-grow">
        {children} {/* Ahora children es una prop y se utiliza correctamente */}
      </main>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;