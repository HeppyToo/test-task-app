import { Ingredient } from "../types";

export const extractIngredients = (meal: any): Ingredient[] => {
    return Array.from({ length: 20 }, (_, i) => i + 1)
        .reduce((ingredients: Ingredient[], index: number) => {
            const ingredient = meal[`strIngredient${index}`];
            const measure = meal[`strMeasure${index}`];

            if (ingredient && ingredient.trim() !== '') {
                ingredients.push({ name: ingredient, measure });
            }

            return ingredients;
        }, []);
};
