import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBarComponent from "../components/SearchbarComponent";
import PaginationComponent from "../components/PaginationComponent";

const ADSEECategoriesPages = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory- categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center px-6 py-8">
  <div className="w-full max-w-6xl bg-white rounded-lg shadow-xl p-8">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-gray-800">Gestión de Categorías</h2>
      <Link to="/admin" className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">Regresar</Link>
      <Link to="/admin/categories/add" className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Agregar Categoría
      </Link>
    </div>
    <div className="overflow-x-auto">
    <SearchBarComponent
            value={searchTerm}
            onChange={handleSearchChange}
          />
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="bg-gray-600">
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Categoría
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentCategories.map((category) => (
            <tr key={category._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {category.categoryName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/admin/categories/edit/${category._id}`} className="inline-block bg-slate-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded mr-2">Actualizar</Link>
                <Link to={`/admin/categories/delete/${category._id}`} className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Eliminar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
    </div>
    {filteredCategories.length === 0 && <div className="text-center py-4">No se encontraron categorías.</div>}
  </div>
</div>
  );
}

export default ADSEECategoriesPages;
