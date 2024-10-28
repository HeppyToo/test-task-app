import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { debounce } from '../utils/debounce';
import { fetchCategories, fetchRecipes } from '../api/mealAPI.ts';

export const useRecipes = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const { data: recipes = [], isLoading: recipesLoading } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const filterRecipes = useCallback(() => {
    let filtered: typeof recipes = recipes;

    if (searchTerm !== '') {
      filtered = filtered.filter((recipe: any) =>
          recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(
          (recipe: any) => recipe.strCategory === selectedCategory,
      );
    }

    return filtered;
  }, [recipes, searchTerm, selectedCategory]);

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
    setSearchTerm,  // Додано для повернення функції setSearchTerm
    selectedCategory,
    handleSearchChange,
    handleCategoryChange,
    recipesLoading,
    categoriesLoading,
  };
};
