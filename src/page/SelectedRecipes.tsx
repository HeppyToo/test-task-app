import React, {useEffect} from 'react';
import {useRecipeStore} from '../store/recipeStore';
import RecipeCard from '../components/RecipeCard';

const SelectedRecipes: React.FC = () => {
    const selectedRecipes = useRecipeStore(state => state.selectedRecipes);
    const getCombinedIngredients = useRecipeStore(state => state.getCombinedIngredients);
    const clearRecipes = useRecipeStore(state => state.clearRecipes);
    const loadRecipes = useRecipeStore(state => state.loadRecipes);

    useEffect(() => {
        loadRecipes();
    }, [loadRecipes]);

    const combinedIngredients = getCombinedIngredients();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Selected Recipes</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {selectedRecipes.map(recipe => (
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

            <div className="flex mb-6">
                <div className="min-w-[240px] w-4/10 pr-4">
                    <h2 className="text-xl font-bold mb-4">Combined Ingredients</h2>
                    <ul className="list-disc pl-5">
                        {combinedIngredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.name}: {ingredient.measure}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-6/10 pl-4">
                    <h2 className="text-xl font-bold mb-4">Instructions</h2>
                    <ol className="list-decimal pl-5">
                        {selectedRecipes.map(recipe => (
                            <li key={recipe.idMeal} className="mb-2">
                                {recipe.strMeal}: {recipe.instructions}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            <button
                onClick={clearRecipes}
                className="mt-4 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-md shadow-md hover:bg-red-700 transition-colors duration-300"
            >
                Clear Selected Recipes
            </button>
        </div>
    );
};

export default SelectedRecipes;
