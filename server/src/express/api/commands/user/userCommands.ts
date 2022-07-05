import { Request, Response } from 'express'

import { FavoritesRecipe } from '../../../../shared/types'
import { supabase } from '../../../../database/supabase'

export const saveRecipeToFavoriteHandler = async (
    req: Request,
    res: Response
) => {
    const { recipeID, userID } = req.body
    const saved = await supabase
        .from<FavoritesRecipe>('favorites_recipe')
        .insert({
            recipe_id: recipeID,
            user_id: userID,
        })

    saved.status === 201
        ? res.status(200).send({ status: 200, message: 'Recipe saved' })
        : res.send({ status: 500, message: 'Error saving recipe' })
}

export const removeSavedRecipeHandler = async (req: Request, res: Response) => {
    const { recipeID, userID } = req.body
    const removed = await supabase
        .from<FavoritesRecipe>('favorites_recipe')
        .delete()
        .eq('recipe_id', recipeID)
        .eq('user_id', userID)

    removed.status === 200
        ? res.status(200).send({ status: 200, message: 'Recipe removed' })
        : res.send({ status: 500, message: 'Error removing recipe' })
}
