import { Request, Response } from 'express'

import { supabase } from '../../../../database/supabase'

export const getAllIngredients = async (req: Request, res: Response) => {
    const result = await supabase.from('ingredients').select(`*`)

    result.status === 200 ? res.send(result.data) : res.send(result.error)
}

export const getAllIngredientsByRecipeID = async (
    req: Request,
    res: Response
) => {
    const result = await supabase
        .from('recipe_ingredient')
        .select(
            `
        ingredients(*)
    `
        )
        .eq('recipe_id', req.params.recipeID)
    console.log(result.data)

    result.status === 200 ? res.send(result.data) : res.send(result.error)
}

export const getIngredientByID = async (req: Request, res: Response) => {
    const result = await supabase
        .from('ingredients')
        .select(`*`)
        .eq('id', req.params.id)

    result.status === 200 ? res.send(result.data) : res.send(result.error)
}
