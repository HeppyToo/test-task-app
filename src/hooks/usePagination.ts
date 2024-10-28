import {useState, useEffect} from 'react';

export const usePagination = (totalItems: number, itemsPerPage: number, currentPageProp: number) => {
    const [currentPage, setCurrentPage] = useState<number>(currentPageProp);

    useEffect(() => {
        setCurrentPage(1);
    }, [totalItems]);

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
