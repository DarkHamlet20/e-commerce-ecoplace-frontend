import React from 'react';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  if (currentPage <= 3) {
    endPage = Math.min(5, totalPages);
  } else if (currentPage + 2 >= totalPages) {
    startPage = Math.max(1, totalPages - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'<<'}
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'<'}
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 border rounded hover:bg-gray-200 ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'>'}
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'>>'}
      </button>
    </div>
  );
};

export default PaginationComponent;
