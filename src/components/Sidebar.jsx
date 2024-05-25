// import axios from "axios";
// import { useEffect, useState } from "react";

// export const Sidebar = ({ showSide, onCategorySelect }) => {
//   const [categories, setCategories] = useState([]);
//   const [drop, setDrop] = useState(false);

//   const getCategories = async () => {
//     const response = await axios.get("http://34.201.92.59:3000/categories");
//     setCategories(response.data);
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   return (
//     <div className="relative md:w-64">
//       <h1
//         onClick={() => setDrop(!drop)}
//         className="p-2 cursor-pointer z-50 absolute left-2 md:hidden text-white bg-blue-600 rounded-md"
//       >
//         Categories
//       </h1>
//       <aside
//         className={`${
//           drop ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 fixed md:static top-0 left-0 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out z-40`}
//       >
//         <div className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Categories</h2>
//           <div className="flex flex-col space-y-2">
//             {categories.map((category) => (
//               <div
//                 key={category._id}
//                 className="cursor-pointer p-2 rounded hover:bg-blue-100 transition-colors"
//                 onClick={() => {
//                   onCategorySelect(category._id);
//                   setDrop(false);
//                 }}
//               >
//                 {category.categoryName}
//               </div>
//             ))}
//           </div>
//         </div>
//       </aside>
//       <div
//         className={`fixed inset-0 bg-black bg-opacity-50 z-30 ${
//           drop ? "block" : "hidden"
//         }`}
//         onClick={() => setDrop(false)}
//       ></div>
//     </div>
//   );
// };
