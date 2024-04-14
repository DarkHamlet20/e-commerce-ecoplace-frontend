/* eslint-disable react/prop-types */
// import React from "react";

// eslint-disable-next-line react/prop-types
const SellerSalesList = ({ sales }) => {
  return (
    <div className="overflow-hidden shadow-md mt-6">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Cliente</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Fecha de Venta</th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Total</th>
            {/* <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Acciones</th> */}
          </tr>
        </thead>
        <tbody className="bg-white">
          {sales && sales.map((sale) => (
            <tr key={sale?._id} className="hover:bg-gray-100">
              <td className="py-3 px-4">{`${sale?.customer?.name} ${sale?.customer?.lastname}`}</td>
              <td className="py-3 px-4">{new Date(sale?.dateOfSale).toLocaleDateString()}</td>
              <td className="py-3 px-4">{`$${sale?.total?.toFixed(2)}`}</td>
              {/* <td className="py-3 px-4">
                <button className="text-blue-500 hover:text-blue-600">Ver detalles</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellerSalesList;
