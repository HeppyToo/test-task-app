import {Ingredient, Recipe} from '../types';
import {extractIngredients} from '../utils/extractIngredients.ts';
import {fetchData} from "../utils/fethData.ts";

const API_URL = 'https://www.themealdb.com/api/json/v1/1';

const ENDPOINTS = {
    SEARCH_RECIPES: '/search.php?s=',
    LIST_CATEGORIES: '/list.php?c=list',
    LOOKUP_RECIPE: (id: string) => `/lookup.php?i=${id}`,
};

export const fetchRecipes = async (): Promise<Recipe[]> => {
    const data = await fetchData(API_URL, ENDPOINTS.SEARCH_RECIPES);
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

export const fetchCategories = async (): Promise<string[]> => {
    const data = await fetchData(API_URL, ENDPOINTS.LIST_CATEGORIES);
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

export const fetchRecipe = async (id: string): Promise<Recipe | null> => {
    const data = await fetchData(API_URL, ENDPOINTS.LOOKUP_RECIPE(id));
    if (data.meals && data.meals.length > 0) {
        const meal = data.meals[0];

        const ingredients: Ingredient[] = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== '') {
                ingredients.push({name: ingredient, measure});
            }
        }

        return {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory: meal.strCategory,
            strArea: meal.strArea,
            ingredients: ingredients,
            instructions: meal.strInstructions || '',
        };
    }

    return null;
};