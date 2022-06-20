import { Ingredients, Recipe } from './../../../../shared/types'
import { Request, Response } from 'express'

import { supabase } from '../../../../database/supabase'

export const getAllRecipesQuery = async (req: Request, res: Response) => {
    const results = await supabase.from('recipes').select()
    results.status === 200 ? res.send(results.data) : res.send(results.error)
}

export const getAllRecipesWithUserQuery = async (
    _req: Request,
    res: Response
) => {
    const results = await supabase.from<Recipe>('recipe').select(`*, user(*)`)
    results.status === 200 ? res.send(results.data) : res.send(results.error)
}

export const getAllIngredientsQuery = async (req: Request, res: Response) => {
    const results = await supabase.from<Ingredients>('ingredients').select()
    results.status === 200 ? res.send(results.data) : res.send(results.error)
}

export const getAllRecipesByUserIdQuery = async (
    req: Request,
    res: Response
) => {
    const result = await supabase
        .from<Recipe>('recipe')
        .select(`*, user(*)`)
        .eq('user_id', req.params.id)

    result.status === 200 ? res.send(result.data) : res.send(result.error)
}

export const getAllRecipeIngredientsByRecipeIdQuery = async (
    recipeId: number
) => {
    const result = await supabase
        .from('recipe_ingredients')
        .select(
            `
        recipe_ingredients.*,
        ingredients(*)
    `
        )
        .eq('recipe_id', recipeId)

    result.status === 200 ? result.data : result.error
}

export const getRecipeByIdQuery = async (req: Request, res: Response) => {
    const result = await supabase
        .from<Recipe>('recipe')
        .select()
        .eq('id', req.params.id)
    result.status === 200 ? res.send(result.data) : res.send(result.error)
}

export const getIngredientByIdQuery = async (req: Request, res: Response) => {
    const result = await supabase
        .from<Ingredients>('ingredients')
        .select()
        .eq('id', req.params.id)
    result.status === 200 ? res.send(result.data) : res.send(result.error)
}
