import React from 'react';
import '../styles/SearchbarComponent.css';

const SearchBarComponent = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || 'Buscar...'}
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBarComponent;
