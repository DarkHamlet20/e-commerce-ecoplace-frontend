import React from 'react'

const AddProductComponent = () => {
  return (
    <div className='flex h-screen items-center'>
      <div className='justify-around flex-col shadow-[0_3px_15px_#000]  rounded-md mx-auto gap-6  p-7 flex'>
         <h1 className='text-2xl'>Add your products here</h1>
            <div className='grid gap-2 grid-cols-2'>
               <input className='p-2 rounded outline-none border' type="text" placeholder='Product Name' />
               <input className='p-2 rounded outline-none border' type="text" placeholder='Image' />

               <input className='p-2 rounded outline-none border' type="text" placeholder='Stock' />
               <input className='p-2 rounded outline-none border' type="text" placeholder='Status' />
            </div>

            <div className='flex flex-col gap-2'>
               <span className='border p-2 rounded cursor-pointer bg-gray-700 text-white'>Add Product</span>
               <span className='border p-2 rounded cursor-pointer bg-gray-700 text-white'>Edit Product</span>
            </div>
      </div>
    </div>
  )
}

export default AddProductComponent