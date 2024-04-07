// import React from 'react';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

// 'children' debe ser desestructurado del objeto props.
// eslint-disable-next-line react/prop-types
const LayoutComponent = ({ children, fuction }) => {
  return (
    <div className='h-full'>
      <HeaderComponent handleSide={fuction} />
      <main className='py-12'>
        <div>
          {children}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;