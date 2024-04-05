import { useState } from 'react';
import CatalogoComponent from '../../components/CatalogoComponent';
import { Header } from '../../components/HeaderComponent';
import { Sidebar } from '../../components/Sidebar';
import LayoutComponent from '../../layout/LayoutMain';

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