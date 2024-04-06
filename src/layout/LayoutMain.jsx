import React from 'react';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

// 'children' debe ser desestructurado del objeto props.
const LayoutComponent = ({ children }) => {
  return (
      <div className=''>
        <HeaderComponent />
        <div className='md:pt-28 sm:pt-36'>
            {children}
        </div>
        <footer className=''>
          <FooterComponent />
        </footer>
      </div>
  );
};

export default LayoutComponent;