import { useState } from 'react';

export const usePagination = (totalItems: number, itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    currentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    handlePageChange,
  };
};
