import React from 'react'

const SellerProducts = (props) => {
  return (
    <div classNameName='w-full'>
       <div className="mx-auto px-4 py-8 sm:px-8">
         <div className="flex items-center justify-between max-h-52 pb-6">
            <div>
               <h2 className="font-semibold text-gray-700">Products</h2>
               <span className="text-xs text-gray-500">View your products</span>
            </div>
         </div>
         <div className="rounded-lg border">
            <div className="overflow-x-auto">
               <table className="w-full">
               <thead>
                  <tr className="bg-gray-700 text-left text-xs font-semibold uppercase tracking-widest text-white">
                     <th className="px-5 py-3">ID</th>
                     <th className="px-5 py-3">Product</th>
                     <th className="px-5 py-3">Stock</th>
                     <th className="px-5 py-3">Price</th>
                     <th className="px-5 py-3">Status</th>
                     <th className="px-5 py-3">Action</th>
                  </tr>
               </thead>
               <tbody className="text-gray-500">
                  <tr>
                     <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <p className="whitespace-no-wrap">{props.id}</p>
                     </td>
                     <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                           <img className="h-full w-full rounded-full" src="/images/-ytzjgg6lxK1ICPcNfXho.png" alt="" />
                        </div>
                        <div className="ml-3">
                           <p className="whitespace-no-wrap">{props.product}</p>
                        </div>
                     </div>
                     </td>
                     <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <p className="whitespace-no-wrap">{props.stock}</p>
                     </td>
                     <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <p className="whitespace-no-wrap">{props.price}</p>
                     </td>

                     <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{props.status}</span>
                     </td>
                     <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <span className="rounded-md bg-red-400 px-3 py-3 text-xs font-semibold text-black cursor-pointer">Delete</span>
                     </td>
                  </tr>
               </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  )
}

export default SellerProducts