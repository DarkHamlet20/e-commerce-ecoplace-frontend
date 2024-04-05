import { useState } from 'react';
import CatalogoComponent from '../../components/CatalogoComponent';
import { Header } from '../../components/layout/HeaderComponent';
import { Sidebar } from '../../components/layout/Sidebar';
import LayoutComponent from '../../components/layout/LayoutComponent';

function HomePage() {

  
  return (
    <>
      <div className={`flex h-screen sm:justify-between pt-28`}>
            <Sidebar />
            <CatalogoComponent />
      </div>
    </>
  );
}

export default HomePage;