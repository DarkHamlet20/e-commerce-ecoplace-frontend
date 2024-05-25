import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/Global.css';

const CategoriesMenu = ({ showCategories, onCategorySelect, toggleCategories }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get("http://34.201.92.59:3000/categories");
      setCategories(response.data);
    };
    getCategories();
  }, []);

  return (
    <>
      {showCategories && (
        <div className="fixed inset-0 z-50 flex items-start justify-start bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-80 max-h-screen overflow-y-auto mt-4 ml-4 relative">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
              Categorías
              <button
                className="py-1 px-2 bg-blue-600 text-white text-1xl rounded hover:bg-blue-700 transition-colors absolute right-4 top-4"
                onClick={toggleCategories}
              >
                Cerrar
              </button>
            </h2>
            <ul className="flex flex-col space-y-2">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="cursor-pointer p-2 rounded hover:bg-blue-100 transition-colors"
                  onClick={() => {
                    onCategorySelect(category._id);
                    toggleCategories();
                  }}
                >
                  {category.categoryName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesMenu;
