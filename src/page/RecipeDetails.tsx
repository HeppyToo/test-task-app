import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Ingredient } from '../types';
import { fetchRecipe } from '../api/mealAPI.ts';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => fetchRecipe(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-center mt-6 text-white">Loading...</div>;
  }

  if (!recipe) {
    return (
      <div className="text-center mt-6 text-red-500">Recipe not found</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto shadow-2xl p-4 rounded-lg flex flex-col items-center">
      <div className="w-full flex flex-col md:flex-row items-start">
        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-96 object-cover rounded-md"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-center md:text-left">
            {recipe.strMeal}
          </h1>
          <p className="text-sm text-gray-400 mb-2 text-center md:text-left">
            Category: {recipe.strCategory}
          </p>
          <p className="text-sm text-gray-400 mb-2 text-center md:text-left">
            Origin: {recipe.strArea}
          </p>

          <h2 className="text-2xl font-bold mt-4 mb-2">Ingredients</h2>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((ingredient: Ingredient, index: number) => (
              <li key={index}>
                {ingredient.name}: {ingredient.measure}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full mt-4">
        <h2 className="text-2xl font-bold mb-2">Instructions</h2>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
