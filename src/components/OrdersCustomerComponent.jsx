import React from "react";
import OrderProduct from "./OrderProduct";

const OrdersCustomerComponent = ({
  customer,
  date,
  orderId,
  payment,
  address,
}) => {
  return (
    <div>
      <main className="rounded-lg shadow-2xl">
        <section className="py-24 relative border">
          <div className="max-w-[90%] px-4 md:px-5 lg-6 mx-auto">
            <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-11">
              Your Order Confirmed
            </h2>
            <h6 className="font-medium text-xl leading-8 text-black mb-3">
              Hello, {customer}
            </h6>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-6 border-y border-gray-100 mb-6">
              <div className="box group">
                <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                  Delivery Date
                </p>
                <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
                  {date}
                </h6>
              </div>
              <div className="box group">
                <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                  Order
                </p>
                <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
                  # {orderId}
                </h6>
              </div>
              <div className="box group">
                <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                  Payment Method
                </p>
                <span>{payment}</span>
              </div>
              <div className="box group">
                <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">
                  Address
                </p>
                <h6 className="font-semibold font-manrope text-2xl leading-9 text-black">
                  {address}
                </h6>
              </div>
            </div>

            <div className="grid grid-cols-7 w-full pb-6 border-b border-gray-100">
              <OrderProduct
                productName={"Monitor"}
                quantity={2}
                image={
                  "img/DALL·E_2024_03_31_20_04_37_Create_an_illustrative_logo_for_EcoPlace (1).webp"
                }
                price={300.99}
              />
            </div>

            <div className="flex items-center justify-center sm:justify-end w-full my-6">
              <div className=" w-full">
                <div className="flex items-center justify-between mb-6">
                  <p className="font-normal text-xl leading-8 text-gray-500">
                    Subtotal
                  </p>
                  <p className="font-semibold text-xl leading-8 text-gray-900">
                    $240.00
                  </p>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <p className="font-normal text-xl leading-8 text-gray-500">
                    Shipping Charge
                  </p>
                  <p className="font-semibold text-xl leading-8 text-gray-900">
                    $60.00
                  </p>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <p className="font-normal text-xl leading-8 text-gray-500">
                    Taxes
                  </p>
                  <p className="font-semibold text-xl leading-8 text-gray-900">
                    $50.00
                  </p>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <p className="font-normal text-xl leading-8 text-gray-500">
                    Discount
                  </p>
                  <p className="font-semibold text-xl leading-8 text-gray-900">
                    $50.00
                  </p>
                </div>
                <div className="flex items-center justify-between py-6 border-y border-gray-100">
                  <p className="font-manrope font-semibold text-2xl leading-9 text-gray-900">
                    Total
                  </p>
                  <p className="font-manrope font-bold text-2xl leading-9 text-indigo-600">
                    $300.00
                  </p>
                </div>
              </div>
            </div>
            <div className="data ">
              <p className="font-normal text-lg leading-8 text-gray-500 mb-11">
                We'll be sending a shipping confirmation email when the items
                shipped successfully.
              </p>
              <h6 className="font-manrope font-bold text-2xl leading-9 text-black mb-3">
                Thank you for shopping with us!
              </h6>
              <p className="font-medium text-xl leading-8 text-indigo-600">
                EcoPlace
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrdersCustomerComponent;
