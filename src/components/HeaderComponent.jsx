import { useNavigate } from 'react-router-dom'
import { SearchComponent } from './SearchComponent'

const HeaderComponent = () => {

  const navigate = useNavigate()

  const handleUser = () => {
    navigate('/user')
  }


  return (
    <header className='border-b py-2  px-6 w-full text-white bg-gray-700 fixed z-50'>
    <div className='mb-3'>
      <div className='flex items-center justify-between'>
      <div>
        <img className='w-16 smm:w-20 rounded-full hidden sm:block' src="img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp" alt="" />
      </div>
      <SearchComponent />
      <nav>
        <div onClick={() => handleUser()} className='flex flex-col items-center px-3 cursor-pointer'>
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
