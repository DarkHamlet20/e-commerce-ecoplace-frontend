// import React from 'react';
import FooterComponent from "../components/FooterComponent";
import NavComponent from "../components/NavComponent";

// 'children' debe ser desestructurado del objeto props.
// eslint-disable-next-line react/prop-types
const LayoutComponent = ({ children, fuction }) => {
  return (
    <>
      <NavComponent
        handleSide={fuction}
      />
      <main>
        <div>
          {children}
        </div>
      </main>
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;
