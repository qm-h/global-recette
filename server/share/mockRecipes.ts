import { Ingredients, Recipes } from './types'

export const mockIngredients: Ingredients[] = [
    { recipeId: 1, name: 'Ingredient 1' },
    {
        recipeId: 1,
        name: 'Ingredient 2',
    },
    {
        recipeId: 1,
        name: 'Ingredient 3',
    },
    {
        recipeId: 2,
        name: 'Ingredient 3',
    },
]
export const emptyMockRecipes: Recipes[] = []
export const mockRecipes: Recipes[] = [
    {
        id: 1,
        name: 'Recette 1',
        details: 'Details Recette 1',
        ingredients: mockIngredients,
        origin: 'hein',
    },
    {
        id: 2,
        name: 'Recette 2',
        details: 'Details Recette 2',
        ingredients: mockIngredients,
        origin: 'oh',
    },
]
