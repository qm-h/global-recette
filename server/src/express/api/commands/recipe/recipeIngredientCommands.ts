import { Request, Response } from 'express'

import { RecipeIngredient } from '../../../../shared/types'
import { supabase } from '../../../../database/supabase'

export const insertRecipeIngredientHandler = async (
    req: Request,
    res: Response
) => {
    const { recipeIngredient } = req.body
    console.log('recipeIngredient = ', recipeIngredient)

    const result = await supabase
        .from<RecipeIngredient>('recipe_ingredient')
        .insert([
            {
                recipe_id: recipeIngredient.recipe_id,
                ingredient_id: recipeIngredient.ingredient_id,
                quantity: recipeIngredient.quantity,
            },
        ])
    if (result.status === 409) {
        console.log(result.error)
    }

    result.status === 201 ? res.sendStatus(200) : res.sendStatus(500)
}
