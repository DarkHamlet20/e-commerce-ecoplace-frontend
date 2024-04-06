import { useNavigate } from 'react-router-dom'
import { SearchComponent } from './SearchComponent'

const HeaderComponent = () => {

  const navigate = useNavigate()

  const handleUser = () => {
    navigate('/user')
  }

  const handleCart = () => {
    navigate('/cart')
  }


  return (
    <header className='border-b py-2  px-6 w-full text-white bg-blue-950 fixed z-50'>
    <div className='mb-3'>
      <div className='flex items-center justify-between'>
      <div>
        <img className='w-16 smm:w-20 rounded-full hidden sm:block' src="img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp" alt="" />
      </div>
      <div className='flex text-white'>
        <input placeholder='Buscar' type="text" className='outline-none p-2 rounded-l smm:w-96' />
        <span className='bg-gray-700 rounded-r p-2 border'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

        </span>
      </div>
      <nav className='flex '>
        <div>
          <div className='px-3 py-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span>Cart</span>
          </div>
        </div>
        <div onClick={() => handleUser()} className='flex flex-col items-center px-3 py-1 cursor-pointer hover:bg-gray-800 transition rounded-full aspect-square'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
          <span>User</span>
        </div>
      </nav>
    </div>
    </div>
    <nav className='border-t md:hidden'>
      <span>Categories</span>
    </nav>
  </header>
  )
}

export default HeaderComponent
