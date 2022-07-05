import { Request, Response } from 'express'

import { Recipe } from './../../../../shared/types'
import { supabase } from '../../../../database/supabase'

export const getAllRecipesWithUserHandler = async (
    _req: Request,
    res: Response
) => {
    const results = await supabase
        .from<Recipe>('recipes')
        .select(`*, user(*)`)
        .eq('published', true)
        .order('created_at', { ascending: false })
    results.status === 200 && res.send(results.data)
}

export const getRecipeByUserIDHandler = async (req: Request, res: Response) => {
    const recipesResult = await supabase
        .from<Recipe>('recipes')
        .select(`*, user(*)`)
        .eq('created_by', req.params.id)
    recipesResult.status === 200
        ? res.send(recipesResult.data)
        : res.send(recipesResult.error)
}

export const getRecipeByIDHandler = async (req: Request, res: Response) => {
    const result = await supabase
        .from<Recipe>('recipes')
        .select()
        .eq('id', req.params.id)
    result.status === 200 ? res.send(result.data) : res.send(result.error)
}

export const getRecipeByNameHandler = async (req: Request, res: Response) => {
    const { recipeName } = req.body
    const result = await supabase
        .from<Recipe>('recipes')
        .select()
        .eq('name', recipeName)
    result.status === 200 ? res.send(result.data) : res.sendStatus(500)
}
