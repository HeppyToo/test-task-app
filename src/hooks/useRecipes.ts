import {useState, useCallback} from 'react';
import {useQuery} from '@tanstack/react-query';
import {debounce} from '../utils/debounce';
import {fetchCategories, fetchRecipes} from '../api/mealAPI.ts';
import {Recipe} from '../types';

export const useRecipes = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const {data: allRecipes = [], isLoading: recipesLoading} = useQuery({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
    });
    const {data: categories = [], isLoading: categoriesLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const filterRecipes = useCallback(() => {
        let filtered: Recipe[] = allRecipes;

        if (searchTerm !== '') {
            filtered = filtered.filter((recipe: Recipe) =>
                recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase()),
            );
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(
                (recipe: Recipe) => recipe.strCategory === selectedCategory,
            );
        }

        return filtered;
    }, [allRecipes, searchTerm, selectedCategory]);

    const filteredRecipes = filterRecipes();

    const handleSearchChange = (search: string) => {
        setSearchTerm(search);
        handleDebouncedSearch(search);
    };

    const handleDebouncedSearch = useCallback(
        debounce((search: string) => {
            setSearchTerm(search);
        }, 300),
        [],
    );

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return {
        filteredRecipes,
        categories,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        handleSearchChange,
        handleCategoryChange,
        recipesLoading,
        categoriesLoading,
    };
};
