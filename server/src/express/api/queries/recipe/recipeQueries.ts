import { Request, Response } from 'express'

import { Recipe } from './../../../../shared/types'
import { logger } from './../../../../server'
import supabase from './../../../../supabase/supabase'

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

export const getRecipeImageHandler = async (req: Request, res: Response) => {
    const { name } = req.params
    logger.debug(`Getting image for recipe ${name}`)
    const image = await (
        await supabase.storage.from('images').createSignedUrl(name, 60)
    ).signedURL

    if (!image) {
        logger.debug(`No image found for recipe ${name}`)
        return res.sendStatus(404)
    }
    logger.debug(`Image found for recipe ${name}`)
    return res.status(200).send({ status: 200, url: image })
}
