import React from 'react';
import {useRecipes} from '../hooks/useRecipes';
import {usePagination} from '../hooks/usePagination';
import RecipeList from '../components/RecipeList';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';

const AllRecipes: React.FC = () => {
    const {
        filteredRecipes,
        categories,
        searchTerm,
        selectedCategory,
        handleSearchChange,
        handleCategoryChange,
        recipesLoading,
        categoriesLoading,
        setSearchTerm,
    } = useRecipes();

    const itemsPerPage = 9;
    const {
        currentPage,
        totalPages,
        indexOfFirstItem,
        indexOfLastItem,
        handlePageChange,
    } = usePagination(filteredRecipes.length, itemsPerPage, 1); // Передаємо довжину відфільтрованих рецептів

    const handleClear = () => {
        setSearchTerm('');
        handleSearchChange('');
    };

    const currentRecipes =
        filteredRecipes.slice(indexOfFirstItem, indexOfLastItem); // Використовуйте `slice` без `?`

    if (recipesLoading || categoriesLoading) {
        return <div className="text-center mt-6 text-white">Loading...</div>;
    }

    if (!filteredRecipes || !categories) {
        return (
            <div className="text-center mt-6 text-red-500">Failed to load data</div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl text-black font-bold mb-4">All Recipes</h1>

            <div className="flex w-full h-full">
                <div className="w-2/3 pr-2 h-full">
                    <SearchBar
                        searchTerm={searchTerm}
                        onSearchChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearchChange(e.target.value)
                        }
                        onClear={handleClear}
                    />
                </div>
                <div className="w-1/3 pl-2 h-full">
                    <CategoryFilter
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>
            </div>

            <RecipeList recipes={currentRecipes}/>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AllRecipes;
