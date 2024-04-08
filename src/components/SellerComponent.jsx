import React from 'react'
import CustomersComponent from './CustomersComponent'
import SellerProducts from './SellerProducts'
import './Seller.css'

const SellerComponent = () => {
  return (
    <main className='h-screen w-full p-10' >
        <div className='container-seller h-full'>
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