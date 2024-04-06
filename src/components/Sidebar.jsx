import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const getCategories = async () => {
    const response = await axios.get('https://ecoplace.3.us-1.fl0.io/categories')
    setCategories(response.data)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        console.error("No se encontro el token de autenticacion.");
      }
      await axios.post('https://ecoplace.3.us-1.fl0.io/users/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      localStorage.removeItem('auth_token');
      // Si la petición es exitosa, elimina el token de localStorage y llama a onLogout
      navigate('/login')
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar cualquier error aquí, por ejemplo, mostrando un mensaje al usuario
    }
  };

  return (
    <>
      <aside className={`mr-4 pt-6 px-6 transition-all -translate-x-full smm:translate-x-0 z-40 hidden smm:flex h-screen`}>
        <div className='flex flex-col justify-between h-[85%] w-52'>
          <div>
            {
              categories.map(category => (
                <div className=' border-b cursor-pointer 
              hover:text-3xl py-1 transition-all' key={category._id}>
                  {category.categoryName}
                </div>
              ))
            }
          </div>
          <button className=' bg-gray-700 text-white rounded-md p-2' onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </aside>




    </>
  )
}
