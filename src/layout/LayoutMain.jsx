import React, { useState, useEffect, cloneElement } from "react";
import FooterComponent from "../components/FooterComponent";
import NavComponent from "../components/NavComponent";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const LayoutComponent = ({ children, resetCategory, searchTerm, onSearchChange, cartCount }) => {
  const [internalCartCount, setInternalCartCount] = useState(cartCount);

  useEffect(() => {
    setInternalCartCount(cartCount);
  }, [cartCount]);

  const updateCartCount = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        const response = await axios.get("http://localhost:3000/carts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInternalCartCount(response.data.items.length);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  return (
    <>
      <NavComponent
        handleSide={() => {}}
        resetCategory={resetCategory}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        cartCount={internalCartCount}
        fetchCart={updateCartCount}
      />
      <main>
        <div>
          {React.Children.map(children, child => 
            React.isValidElement(child) ? cloneElement(child, { updateCartCount }) : child
          )}
        </div>
      </main>
      <FooterComponent />
    </>
  );
};

export default LayoutComponent;
