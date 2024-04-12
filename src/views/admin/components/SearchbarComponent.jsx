import React from 'react';

const SearchBarComponent = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar-container mb-4">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Buscar...'}
        className="w-full p-2 border rounded-md outline-none"
      />
    </div>
  );
};

export default SearchBarComponent;
