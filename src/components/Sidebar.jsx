import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Sidebar = () => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const getCategories = async () => {
    const response = await axios.get('http://localhost:3000/categories')
    setCategories(response.data)
  }

  useEffect(() => {
    getCategories()
  }, [])


  return (
    <>
      <aside className={`mr-4 pt-24 px-6 transition-all -translate-x-full smm:translate-x-0 z-40 hidden smm:flex h-screen`}>
        <div className='flex flex-col justify-between h-[85%] w-52'>
          <h1 className='text-4xl my-5 border-b'>Catalogo</h1>
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
          
        </div>
      </aside>




    </>
  )
}
