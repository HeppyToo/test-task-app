import { create } from 'zustand';

interface Ingredient {
    name: string;
    measure: string;
}

interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    ingredients: Ingredient[];
    instructions: string;
}

interface RecipeStore {
    selectedRecipes: Recipe[];
    addRecipe: (recipe: Recipe) => void;
    removeRecipe: (id: string) => void;
    clearRecipes: () => void;
    getCombinedIngredients: () => Ingredient[];
    loadRecipes: () => void;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
    selectedRecipes: [],
    addRecipe: recipe => {
        set(state => {
            const updatedRecipes = [...state.selectedRecipes, recipe];
            localStorage.setItem('selectedRecipes', JSON.stringify(updatedRecipes));
            return { selectedRecipes: updatedRecipes };
        });
    },
    removeRecipe: id => {
        set(state => {
            const updatedRecipes = state.selectedRecipes.filter(recipe => recipe.idMeal !== id);
            localStorage.setItem('selectedRecipes', JSON.stringify(updatedRecipes));
            return { selectedRecipes: updatedRecipes };
        });
    },
    clearRecipes: () => {
        set({ selectedRecipes: [] });
        localStorage.removeItem('selectedRecipes');
    },
    getCombinedIngredients: () => {
        const combinedIngredients: { [key: string]: string } = {};
        get().selectedRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                const key = ingredient.name.toLowerCase();
                if (combinedIngredients[key]) {
                    combinedIngredients[key] += `, ${ingredient.measure}`;
                } else {
                    combinedIngredients[key] = ingredient.measure;
                }
            });
        });
        return Object.entries(combinedIngredients).map(([name, measure]) => ({
            name,
            measure,
        }));
    },
    loadRecipes: () => {
        const storedRecipes = localStorage.getItem('selectedRecipes');
        if (storedRecipes) {
            set({ selectedRecipes: JSON.parse(storedRecipes) });
        }
    },
}));
