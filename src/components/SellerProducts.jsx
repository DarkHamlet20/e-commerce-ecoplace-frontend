import React from 'react'

const SellerProducts = (props) => {
  return (
    <div className='w-full'>
       <div class="mx-auto px-4 py-8 sm:px-8">
         <div class="flex items-center justify-between max-h-52 pb-6">
            <div>
               <h2 class="font-semibold text-gray-700">Products</h2>
               <span class="text-xs text-gray-500">View your products</span>
            </div>
         </div>
         <div class="rounded-lg border">
            <div class="overflow-x-auto">
               <table class="w-full">
               <thead>
                  <tr class="bg-gray-700 text-left text-xs font-semibold uppercase tracking-widest text-white">
                     <th class="px-5 py-3">ID</th>
                     <th class="px-5 py-3">Product</th>
                     <th class="px-5 py-3">Stock</th>
                     <th class="px-5 py-3">Orders</th>
                     <th class="px-5 py-3">Status</th>
                     <th class="px-5 py-3">Action</th>
                  </tr>
               </thead>
               <tbody class="text-gray-500">
                  <tr>
                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <p class="whitespace-no-wrap">{props.id}</p>
                     </td>
                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                           <img class="h-full w-full rounded-full" src="/images/-ytzjgg6lxK1ICPcNfXho.png" alt="" />
                        </div>
                        <div class="ml-3">
                           <p class="whitespace-no-wrap">{props.product}</p>
                        </div>
                     </div>
                     </td>
                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <p class="whitespace-no-wrap">{props.stock}</p>
                     </td>
                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <p class="whitespace-no-wrap">{props.orders}</p>
                     </td>

                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <span class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{props.status}</span>
                     </td>
                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <span class="rounded-md bg-red-400 px-3 py-3 text-xs font-semibold text-black cursor-pointer">Delete</span>
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