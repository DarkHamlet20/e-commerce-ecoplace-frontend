// import React from 'react'
import CustomersComponent from './CustomersComponent'
import SellerProducts from './SellerProducts'
import './Seller.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

const SellerComponent = () => {

  const [seller, setSeller] = useState({});
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("auth_token");

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setSeller(response.data);
          return response.data._id;
        })
        .then(sellerId => {
          axios.get("http://localhost:3000/sales/seller", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": 'aplication/json',
            },
            data: {
              user: {
                _id: sellerId
              }
            }
          }).then(response => setOrders(response.data));
        })
        .catch((error) => {
          console.error("There was an error with the request:", error);
          // Optionally, you can handle errors here or show a message to the user
        });
    }
  }, [token]);

  return (
    <main className='w-full p-10' >
      <div className='container-seller'>
        <div className='customers rounded-lg shadow-[0_3px_15px_rgb(0,0,0,0.2)] p-7 flex flex-col'>
          <h1 className='text-2xl font-bold'>Welcome, {seller?.name}!</h1>
          <div className="flex items-center justify-between max-h-52 pb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Customers</h2>
              <span className="text-xs text-gray-500">View accounts of registered users</span>
            </div>
          </div>
          {
            orders && orders.map(order => {
              return (
                <CustomersComponent
                  key={order?._id}
                  customer={order?.customer?.name}
                  orderId={order?._id}
                  date={order?.updatedAt}
                  product={order?.items?.product}
                  status={order?.status}
                />
              )
            })
          }
        </div>
        <div className='rounded-lg shadow-[0_3px_15px_rgb(0,0,0,0.2)] p-7'>
          <div className="items-center justify-between max-h-52 pb-6">
            <div>
              <h2 className="font-semibold text-gray-700">Products</h2>
              <span className="text-xs text-gray-500">View your products</span>
            </div>
          </div>
          <SellerProducts />
        </div>
      </div>
    </main>
  )
}

export default SellerComponent