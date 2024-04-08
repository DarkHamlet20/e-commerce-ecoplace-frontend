import React from 'react'

const CustomersComponent = (props) => {
  return (
    <div className='w-full'>
      <div class="mx-auto  px-4 py-8 sm:px-8">
         <div class="flex  items-center justify-between max-h-52 pb-6">
            <div>
               <h2 class="font-semibold text-gray-700">Customers</h2>
               <span class="text-xs text-gray-500">View accounts of registered users</span>
            </div>
         </div>
         <div class=" rounded-lg border">
            <div class="overflow-x-auto">
               <table class="w-full">
               <thead>
                  <tr class="bg-gray-700 text-left text-xs font-semibold uppercase tracking-widest text-white">
                     <th class="px-5 py-3">Order</th>
                     <th class="px-5 py-3">Customer</th>
                     <th class="px-5 py-3">Product</th>
                     <th class="px-5 py-3">Date</th>
                     <th class="px-5 py-3">Status</th>
                  </tr>
               </thead>
               <tbody class="text-gray-500">
                  <tr>
                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <p class="whitespace-no-wrap">{props.orderId}</p>
                     </td>
                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <div class="flex items-center">
                        <div class="h-10 w-10 flex-shrink-0">
                           <img class="h-full w-full rounded-full" src="/images/-ytzjgg6lxK1ICPcNfXho.png" alt="" />
                        </div>
                        <div class="ml-3">
                           <p class="whitespace-no-wrap">{props.customer}</p>
                        </div>
                     </div>
                     </td>
                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <p class="whitespace-no-wrap">{props.product}</p>
                     </td>
                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <p class="whitespace-no-wrap">{props.date}</p>
                     </td>

                     <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                     <span class="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">{props.status}</span>
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