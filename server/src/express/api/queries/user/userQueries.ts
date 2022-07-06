import {
    FavoritesRecipe,
    FavoritesRecipeWithUser,
    FavoritesRecipesResponse,
    RecipeUser,
} from './../../../../shared/types'
import { Request, Response } from 'express'

import { logger } from '../../../../server'
import supabase from '../../../../supabase/supabase'

export const getSavedRecipesHandler = async (req: Request, res: Response) => {
    const { userID } = req.params
    const savedRecipes = await supabase
        .from<FavoritesRecipe>('favorites_recipe')
        .select()
        .eq('user_id', parseInt(userID))

    if (savedRecipes.status === 400) {
        res.sendStatus(404)
    }

    if (savedRecipes.status === 200) {
        return res.status(200).send(savedRecipes.data)
    }
}

export const getAllFavoritesRecipeHandler = async (
    req: Request,
    res: Response
) => {
    const { userID } = req.params

    const allFavoritesRecipe = await supabase
        .from<FavoritesRecipesResponse>('favorites_recipe')
        .select('recipes(*)')
        .eq('user_id', parseInt(userID))

    const user = await supabase
        .from<RecipeUser>('user')
        .select('id, username, avatar')
        .filter(
            'id',
            'in',
            `(${allFavoritesRecipe.data
                .map((recipe) => recipe.recipes.created_by)
                .join(',')})`
        )

    logger.debug(JSON.stringify(user))

    const favoritesResponse = {
        favorites: allFavoritesRecipe.data,
        users: user.data,
    }

    if (allFavoritesRecipe.status === 400) {
        logger.debug(JSON.stringify(allFavoritesRecipe))
        return res.sendStatus(404)
    }

    if (allFavoritesRecipe.status === 200) {
        return res.status(200).send(favoritesResponse)
    }
}

export const getUserByIDHandler = async (req: Request, res: Response) => {
    const { userID } = req.params

    const user = await supabase
        .from<RecipeUser>('user')
        .select('id, username, avatar')
        .eq('id', parseInt(userID))

    if (user.status === 400) {
        return res.sendStatus(404)
    }

    if (user.status === 200) {
        return res.status(200).send(user.data)
    }
}
