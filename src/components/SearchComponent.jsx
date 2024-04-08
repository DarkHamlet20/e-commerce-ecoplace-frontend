import React from 'react'

export const SearchComponent = () => {
  return (
    <>
      <div className='flex text-white'>
        <input placeholder='Buscar' type="text" className='outline-none p-2 rounded-l smm:m-w-48 md:w-96 text-black' />
        <span className='bg-gray-700 rounded-r p-2 border'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>

        </span>
      </div>
    </>
  )
}
