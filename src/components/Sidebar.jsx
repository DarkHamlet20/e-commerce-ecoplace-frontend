import axios from "axios";
import { useEffect, useState } from "react";
export const Sidebar = ({ showSide, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get("https://34.201.92.59/categories");
    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    <div className="flex flex-col">
    <aside className={`sidebar-sticky mr-10 px-6 transition-all z-40 absolute ${
            showSide ? "hidden" : "flex"
          } smm:flex smm:static left-0 bg-white h-full rounded-r shadow-lg`}>
      <div className="flex flex-col w-52">
        <h1 className="text-4xl py-5 border-b">Catálogo</h1>
        <div>
          {categories.map((category) => (
            <div
              className="border-b cursor-pointer hover:text-3xl py-1 transition-all"
              key={category._id}
              onClick={() => onCategorySelect(category._id)}
            >
              {category.categoryName}
            </div>
          ))}
        </div>
      </div>
    </aside>
    </div>
    </>
  );
};
