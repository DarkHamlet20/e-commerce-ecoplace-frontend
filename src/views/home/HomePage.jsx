import { useState } from "react";
import CatalogoComponent from "../../components/CatalogoComponent";
import CategoriesMenu from "../../components/CategoriesMenu";
import LayoutComponent from "../../layout/LayoutMain";
import '../../styles/Global.css';

const HomePage = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const resetCategory = () => {
    setSelectedCategoryId(null);
  };

  return (
    <>
      <LayoutComponent toggleCategories={toggleCategories} resetCategory={resetCategory}>
        <div className="flex flex-col md:flex-row justify-center min-h-[800px]">
          <CatalogoComponent categoryId={selectedCategoryId} />
        </div>
      </LayoutComponent>
      <CategoriesMenu 
        showCategories={showCategories} 
        onCategorySelect={handleCategorySelect} 
        toggleCategories={toggleCategories} 
      />
    </>
  );
};

export default HomePage;
