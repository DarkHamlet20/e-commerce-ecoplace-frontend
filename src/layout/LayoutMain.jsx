import React from 'react';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

// 'children' debe ser desestructurado del objeto props.
const LayoutComponent = ({ children }) => {
  return (
    <div>
      <HeaderComponent />
      <div className='pt-28'>
          {children}
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;