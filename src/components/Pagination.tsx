import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisiblePages?: number;
    buttonClass?: string;
}

const Pagination: React.FC<PaginationProps> = ({
                                                   currentPage,
                                                   totalPages,
                                                   onPageChange,
                                                   maxVisiblePages = 7,
                                                   buttonClass = 'bg-gray-700 hover:bg-gray-600 text-white',
                                               }) => {
    const getPaginationNumbers = () => {
        const paginationNumbers: (number | string)[] = [];

        const addPageNumbers = (start: number, end: number) => {
            for (let i = start; i <= end; i++) {
                paginationNumbers.push(i);
            }
        };

        if (totalPages <= maxVisiblePages) {
            addPageNumbers(1, totalPages);
        } else {
            if (currentPage <= 4) {
                addPageNumbers(1, maxVisiblePages);
                paginationNumbers.push('...', totalPages);
            } else if (currentPage > totalPages - 4) {
                paginationNumbers.push(1, '...');
                addPageNumbers(totalPages - maxVisiblePages + 1, totalPages);
            } else {
                paginationNumbers.push(1, '...');
                addPageNumbers(currentPage - 2, currentPage + 2);
                paginationNumbers.push('...', totalPages);
            }
        }

        return paginationNumbers;
    };

    return (
        <div className="flex justify-center items-center mt-6">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : buttonClass
                }`}
            >
                &laquo;
            </button>

            {getPaginationNumbers().map((number, index) => (
                <button
                    key={index}
                    onClick={() => typeof number === 'number' && onPageChange(number)}
                    className={`px-4 py-2 mx-1 rounded ${
                        currentPage === number ? 'bg-blue-600 text-white' : buttonClass
                    }`}
                    disabled={number === '...'}
                >
                    {number}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-1 rounded ${
                    currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : buttonClass
                }`}
            >
                &raquo;
            </button>
        </div>
    );
};

export default Pagination;
