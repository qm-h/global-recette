import { Ingredients, Recipes } from './types'

export const mockIngredients: Ingredients[] = [
    { id: 1, nomIngredient: 'Ingredient 1' },
    {
        id: 1,
        nomIngredient: 'Ingredient 2',
    },
    {
        id: 1,
        nomIngredient: 'Ingredient 3',
    },
    {
        id: 2,
        nomIngredient: 'Ingredient 3',
    },
]
export const emptyMockRecipes: Recipes[] = []
export const mockRecipes: Recipes[] = [
    {
        id: 1,
        nomRecette: 'Recette 1',
        description: 'Details Recette 1',
        ingredients: mockIngredients,
        origin: 'hein',
    },
    {
        id: 2,
        nomRecette: 'Recette 2',
        description: 'Details Recette 2',
        ingredients: mockIngredients,
        origin: 'oh',
    },
]
