import { Request, Response } from 'express'

import { Ingredients } from './../../../../shared/types'
import { RecipeIngredient } from '../../../../shared/types'
import { supabase } from '../../../../database/supabase'

export const getAllIngredientsHandler = async (req: Request, res: Response) => {
    const result = await supabase.from('ingredients').select(`*`)
    result.status === 200 ? res.send(result.data) : res.send(result.error)
}

export const getAllIngredientsByRecipeIDHandler = async (
    req: Request,
    res: Response
) => {
    const result = await supabase
        .from<RecipeIngredient>('recipe_ingredient')
        .select(
            `
        ingredients(*)
    `
        )
        .eq('recipe_id', req.params.recipeID)
    result.status === 200 ? res.send(result.data) : res.send(result.error)
}

export const getIngredientByIDHandler = async (req: Request, res: Response) => {
    const result = await supabase
        .from<Ingredients>('ingredients')
        .select(`*`)
        .eq('id', req.params.id)

    result.status === 200 ? res.send(result.data) : res.send(result.error)
}
