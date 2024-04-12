/* eslint-disable react/prop-types */
// import React from 'react'

const CustomersComponent = ({ orderId, customer, product, date, status }) => {
   return (
      <div className='w-full'>
         <div className="mx-auto  px-4 py-8 sm:px-8">
            <div className=" rounded-lg border">
               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead>
                        <tr className="bg-gray-700 text-left text-xs font-semibold uppercase tracking-widest text-white">
                           <th className="px-5 py-3">Order</th>
                           <th className="px-5 py-3">Customer</th>
                           <th className="px-5 py-3">Product</th>
                           <th className="px-5 py-3">Date</th>
                           <th className="px-5 py-3">Status</th>
                        </tr>
                     </thead>
                     <tbody className="text-gray-500">
                        <tr>
                           <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap">{orderId}</p>
                           </td>
                           <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <div className="flex items-center">
                                 <div className="h-10 w-10 flex-shrink-0">
                                    <img className="h-full w-full rounded-full" src="/images/-ytzjgg6lxK1ICPcNfXho.png" alt="" />
                                 </div>
                                 <div className="ml-3">
                                    <p className="whitespace-no-wrap">{customer}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap">{product}</p>
                           </td>
                           <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <p className="whitespace-no-wrap">{date}</p>
                           </td>

                           <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                              <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{status}</span>
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

export default CustomersComponent