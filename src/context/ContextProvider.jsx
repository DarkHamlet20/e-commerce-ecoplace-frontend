import React, { useState, useEffect } from "react";
import axios from "axios";
import ContextComponent from "./ContextComponent";

const ContextProvider = ({ children }) => {
  const [showCategories, setShowCategories] = useState(false);

  const handleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <ContextComponent.Provider value={{ showCategories, handleCategories }}>
      {children}
    </ContextComponent.Provider>
  );
};

export default ContextProvider;
