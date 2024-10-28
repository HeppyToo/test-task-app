export interface Ingredient {
  name: string;
  measure: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  ingredients: Ingredient[];
  instructions: string;
}
