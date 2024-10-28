import React from 'react';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types';

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.idMeal}
          idMeal={recipe.idMeal}
          strMeal={recipe.strMeal}
          strMealThumb={recipe.strMealThumb}
          strCategory={recipe.strCategory}
          strArea={recipe.strArea}
          ingredients={recipe.ingredients}
          instructions={recipe.instructions}
        />
      ))}
    </div>
  );
};

export default RecipeList;
