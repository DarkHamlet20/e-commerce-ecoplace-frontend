import React from 'react';
import FooterComponent from '../components/FooterComponent';
import { Header } from '../components/HeaderComponent';

// 'children' debe ser desestructurado del objeto props.
const LayoutComponent = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='pt-28'>
          {children}
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;