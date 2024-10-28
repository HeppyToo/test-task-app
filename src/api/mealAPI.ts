import { Ingredient, Recipe } from '../types';

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipes = async () => {
  const response = await fetch(`${API_URL}/search.php?s=`);
  const data = await response.json();
  if (data.meals) {
    return data.meals.map((meal: any) => ({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      ingredients: extractIngredients(meal),
      instructions: meal.strInstructions || '',
    }));
  }
  return [];
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/list.php?c=list`);
  const data = await response.json();
  if (data.meals) {
    return [
      'All',
      ...data.meals.map(
        (category: { strCategory: string }) => category.strCategory,
      ),
    ];
  }
  return [];
};

const extractIngredients = (meal: any): Ingredient[] => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ name: ingredient, measure });
    }
  }
  return ingredients;
};

export const fetchRecipe = async (id: string): Promise<Recipe | null> => {
  const response = await fetch(`${API_URL}/lookup.php?i=${id}`);
  const data = await response.json();

  if (data.meals && data.meals.length > 0) {
    const meal = data.meals[0];

    const ingredients: Ingredient[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== '') {
        ingredients.push({ name: ingredient, measure });
      }
    }

    return {
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      ingredients: ingredients,
      instructions: meal.strInstructions,
    };
  }

  return null;
};
