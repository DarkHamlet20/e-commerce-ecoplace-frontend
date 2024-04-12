import React from "react";

const OrderProduct = ({ quantity, productName, price, image }) => {
  return (
    <>
      <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
        <img src={image} alt={`${productName} image`} className="w-full" />
      </div>
      <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
        <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center justify-between">
          <div className="">
            <h5 className="font-manrope font-semibold text-2xl leading-9 text-black mb-6">
              {productName}
            </h5>
            <p className="font-normal text-xl leading-8 text-gray-500">
              Quantity :{" "}
              <span className="text-black font-semibold">{quantity}</span>
            </p>
          </div>

          <h5 className="font-manrope font-semibold text-3xl leading-10 text-black sm:text-right mt-3">
            {price}
          </h5>
        </div>
      </div>
    </>
  );
};

export default OrderProduct;
