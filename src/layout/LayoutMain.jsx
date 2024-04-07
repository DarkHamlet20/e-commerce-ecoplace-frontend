// import React from 'react';
import FooterComponent from '../components/FooterComponent';
import NavComponent from '../components/NavComponent';

// 'children' debe ser desestructurado del objeto props.
// eslint-disable-next-line react/prop-types
const LayoutComponent = ({ children, fuction }) => {
  return (
    <div className='h-full'>
      <NavComponent handleSide={fuction} />
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