import React, { useState } from 'react'

export const Header = () => {

  const [mode, setMode] = useState(false)

  return (
    <div className='flex items-center justify-between'>
      <div>
        <img className='w-16 smm:w-24 rounded-full hidden sm:block' src="img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp" alt="" />
      </div>
      <div className='flex text-white'>
        <input placeholder='Buscar' type="text" className='outline-none p-2 rounded-l smm:w-96' />
        <span className='bg-gray-700 rounded-r p-2 border'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

        </span>
      </div>
      <nav>
        <div className='flex flex-col items-center px-3'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
          <span>User</span>
        </div>
      </nav>
    </div>
  )
}
