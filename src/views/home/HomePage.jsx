import { useState } from "react";
import CatalogoComponent from "../../components/CatalogoComponent";
import { Sidebar } from "../../components/Sidebar";
import LayoutComponent from "../../layout/LayoutMain";

const HomePage = () => {
  const [showSide, setShowSide] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <>
      <LayoutComponent function={setShowSide}>
        <div className="flex justify-center smm:justify-between w-screen">
          <Sidebar showSide={showSide} onCategorySelect={handleCategorySelect} />
          <CatalogoComponent categoryId={selectedCategoryId} />
        </div>
      </LayoutComponent>
    </>
  );
};

export default HomePage;
