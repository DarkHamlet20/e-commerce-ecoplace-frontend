import axios from "axios";
import { useEffect, useState } from "react";
import { useAsyncError } from "react-router-dom";
export const Sidebar = ({ showSide, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get("http://34.201.92.59:3000/categories");
    setCategories(response.data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [drop, setDrop] = useState(false)

  return (
    <>
    <h1 onClick={() => setDrop(!drop)}
     className="p-2 cursor-pointer z-50 absolute left-2 md:hidden">Categories</h1>
    <div className={` ${drop ? 'relative smm:static' : 'flex flex-col'}`}>
    <aside className={`${drop ? 'scale-0' : 'scale-100'} md:scale-100 sidebar-sticky mt-14 md:mt-0 md:pt-5 mr-10 absolute px-6 transition-all z-40  flex smm:static left-0 bg-white h-full rounded-r shadow-lg`}>
      <div className="flex flex-col w-48">
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
