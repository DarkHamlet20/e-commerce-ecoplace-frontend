import React, { useState } from 'react'
import './Product.css'

const ProductComponent = ({ id, name, img, description, brand, price }) => {
  const [count, setCount] = useState(0)
  return (
    <>
      <main id={id} className='h-screen'>
        <div className='flex items-center h-full'>
          <div className='w-[90%] lg:w-[850px] mx-auto rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] product-container p-6 '>
            <div className='mr-3'>
              <picture>
                <img src={img}  className='aspect-square w-80 rounded-md' alt="" />
              </picture>
            </div>
            <div>
              <span>Brand: {brand}</span>
              <h2 className='text-3xl font-bold my-4'>{name}</h2>
              <p className='my-5'>{description}</p>
              <span className='text-2xl'>${price}</span>
              <div className='flex justify-around my-8 mx-auto flex-col w-52 smm:flex smm:flex-row smm:w-full text-center '>
                <div className='mb-3 smm:mb-0 select-none text-white rounded-md p-2 shadow-md'>
                  <span onClick={() => setCount(count - 1)} className='text-blue-950 px-3 text-xl cursor-pointer'>-</span><span className='text-blue-950 px-3 text-xl'>{count}</span><span onClick={() => setCount(count + 1)} className='text-blue-950 px-3 text-xl cursor-pointer'>+</span>
                </div>

                <a href='#' className='bg-blue-950 text-white rounded-md p-2 text'>Add to Cart</a>
                
              </div>
            </div>
            
          </div>
        </div>
      </main>
    </>
  )
}

export default ProductComponent