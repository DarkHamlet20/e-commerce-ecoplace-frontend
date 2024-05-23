import React from 'react';

const SellerSearchBarComponent = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative flex items-center justify-center w-full max-w-2xl mx-auto mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Buscar...'}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.65 6.35a7.5 7.5 0 005.65 10.65z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default SellerSearchBarComponent;
