import React from "react";

const SearchComponent = ({ value, onChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <div className="relative w-full max-w-xl">
        <input
          value={value}
          onChange={onChange}
          placeholder="Buscar productos..."
          type="text"
          className="w-full p-3 pl-4 pr-12 rounded-full shadow-md border border-gray-300 focus:border-blue-500 focus:outline-none text-black transition duration-300 ease-in-out transform hover:scale-105"
        />
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default SearchComponent;
