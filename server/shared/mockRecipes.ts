import { Ingredients, Recipe } from './types'

export const mockIngredients: Ingredients[] = [
    { idIngredient: 1, nomIngredient: 'Ingredient 1' },
    {
        idIngredient: 1,
        nomIngredient: 'Ingredient 2',
    },
    {
        idIngredient: 1,
        nomIngredient: 'Ingredient 3',
    },
    {
        idIngredient: 2,
        nomIngredient: 'Ingredient 3',
    },
]
export const emptyMockRecipes: Recipe[] = []
export const mockRecipes: Recipe[] = [
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
