import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

interface RecipeCardProps {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  ingredients: { name: string; measure: string }[];
  instructions: string;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  idMeal,
  strMeal,
  strMealThumb,
  strCategory,
  strArea,
  ingredients,
  instructions,
}) => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const removeRecipe = useRecipeStore(state => state.removeRecipe);
  const selectedRecipes = useRecipeStore(state => state.selectedRecipes);
  const [isLoading, setIsLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selectedRecipes.some(recipe => recipe.idMeal === idMeal));
  }, [selectedRecipes, idMeal]);

  const handleToggleRecipe = () => {
    setIsLoading(true);
    if (isSelected) {
      removeRecipe(idMeal);
    } else {
      addRecipe({
        idMeal,
        strMeal,
        strMealThumb,
        strCategory,
        strArea,
        ingredients,
        instructions,
      });
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="shadow-2xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
      <div className="relative overflow-hidden">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{strMeal}</h2>
        <p className="text-sm text-gray-400 mt-2">Category: {strCategory}</p>
        <p className="text-sm text-gray-400">Origin: {strArea}</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleToggleRecipe}
            disabled={isLoading}
            aria-label={
              isSelected
                ? 'Remove recipe from selected'
                : 'Add recipe to selected'
            }
            className={`px-4 py-2 text-sm font-semibold rounded-md shadow-md transition-colors duration-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : isSelected
                  ? 'bg-red-600 hover:bg-red-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading
              ? 'Processing...'
              : isSelected
                ? 'Remove from Selected'
                : 'Add to Selected'}
          </button>

          <Link
            to={`/recipe/${idMeal}`}
            aria-label={`View details for ${strMeal}`}
            className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-green-700 transition-colors duration-300"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
