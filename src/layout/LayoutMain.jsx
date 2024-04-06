// import React from 'react';
import FooterComponent from '../components/FooterComponent';
import HeaderComponent from '../components/HeaderComponent';

// 'children' debe ser desestructurado del objeto props.
// eslint-disable-next-line react/prop-types
const LayoutComponent = ({ children }) => {
  return (
<<<<<<< HEAD
      <div className=''>
        <HeaderComponent />
        <div className='md:pt-28 sm:pt-36'>
            {children}
        </div>
        <footer className=''>
          <FooterComponent />
        </footer>
      </div>
=======
    <div className='h-full'>
      <HeaderComponent />
      <main>
        <div className='pt-28'>
          {children}
        </div>
      </main>
      <FooterComponent />
    </div>
>>>>>>> 3971202d3f2d84bd23fbe84b99438d2ab4af0b30
  );
};

export default LayoutComponent;