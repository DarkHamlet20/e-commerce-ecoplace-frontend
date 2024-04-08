import React from 'react'
import CustomersComponent from './CustomersComponent'
import SellerProducts from './SellerProducts'
import './Seller.css'

const SellerComponent = () => {
  return (
    <main className='h-screen w-full p-10' >
        <div className='container-seller h-full'>
            <div className='justify-around shadow-[0_3px_15px_#000] bg-gray-700 rounded-lg p-7 flex'>
                <div className='grid gap-2 grid-cols-2'>
                    <input className='p-2 rounded outline-none' type="text" placeholder='Product Name' />
                    <input className='p-2 rounded outline-none' type="text" placeholder='Image' />

                    <input className='p-2 rounded outline-none' type="text" placeholder='Stock' />
                    <input className='p-2 rounded outline-none' type="text" placeholder='Status' />
                </div>

                <div className='flex flex-col gap-2'>
                    <span className='border p-2 rounded cursor-pointer bg-white'>Add Product</span>
                    <span className='border p-2 rounded cursor-pointer bg-white'>Edit Product</span>
                </div>
            </div>
            <div className='customers rounded-lg shadow-[0_3px_15px_rgb(0,0,0,0.2)]  p-7 flex'>
                <CustomersComponent />
            </div>
            <div className='products rounded-lg shadow-[0_3px_15px_rgb(0,0,0,0.2)] p-7 flex'>
                <SellerProducts />
            </div>
            
        </div>
    </main>
  )
}

export default SellerComponent