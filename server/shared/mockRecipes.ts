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
        idRecette: 1,
        nomRecette: 'Recette 1',
        description: 'Details Recette 1',
        origine: 'hein',
    },
    {
        idRecette: 2,
        nomRecette: 'Recette 2',
        description: 'Details Recette 2',
        origine: 'oh',
    },
]
