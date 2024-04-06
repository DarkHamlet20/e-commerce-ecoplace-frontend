// import React from 'react';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

// 'children' debe ser desestructurado del objeto props.
// eslint-disable-next-line react/prop-types
const LayoutComponent = ({ children }) => {
  return (
    <div className='h-full'>
      <HeaderComponent />
      <main>
        <div className='pt-28'>
          {children}
        </div>
      </main>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;