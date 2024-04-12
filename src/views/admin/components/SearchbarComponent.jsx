import React from 'react';

const SearchBarComponent = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Buscar...'}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
};

export default SearchBarComponent;
