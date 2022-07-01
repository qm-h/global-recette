import { Request, Response } from 'express'

import { Recipe } from './../../../../shared/types'
import { supabase } from '../../../../database/supabase'

export const getAllRecipesWithUser = async (_req: Request, res: Response) => {
    const results = await supabase
        .from<Recipe>('recipes')
        .select(`*, user(*)`)
        .eq('published', true)
        .order('created_at', { ascending: false })
    results.status === 200 ? res.send(results.data) : res.send(results.error)
}

export const getRecipeByUserID = async (req: Request, res: Response) => {
    const results = await supabase
        .from<Recipe>('recipes')
        .select(`*, user(*)`)
        .eq('user_id', req.params.id)
    results.status === 200 ? res.send(results.data) : res.send(results.error)
}

export const getRecipeById = async (req: Request, res: Response) => {
    const result = await supabase
        .from<Recipe>('recipes')
        .select()
        .eq('id', req.params.id)
    result.status === 200 ? res.send(result.data) : res.send(result.error)
}

export const getRecipeByName = async (req: Request, res: Response) => {
    const { recipeName } = req.body
    const result = await supabase
        .from<Recipe>('recipes')
        .select()
        .eq('name', recipeName)
    result.status === 200 ? res.send(result.data) : res.sendStatus(500)
}
