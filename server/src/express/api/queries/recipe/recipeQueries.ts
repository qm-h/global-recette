import { Recipe, SuccessAuthUser } from './../../../../shared/types'
import { Request, Response } from 'express'

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
    const { userID } = req.params
    const recipesResult = await supabase
        .from<Recipe>('recipes')
        .select(`*, user(*)`)
        .eq('created_by', userID)
    recipesResult.status === 200
        ? res.send({
              status: 200,
              message: 'Recipes result',
              recipes: recipesResult.data,
          })
        : res.send({ status: 500, message: recipesResult.error, recipes: [] })
}

export const getAllPublishedRecipeByUserIDHandler = async (
    req: Request,
    res: Response
) => {
    const { userID } = req.params
    const recipesResult = await supabase
        .from('recipes')
        .select()
        .eq('created_by', userID)
        .eq('published', true)
        .order('created_at', { ascending: false })

    if (recipesResult.status === 400) {
        return res.send({ status: 500, message: 'Error getting recipe' })
    }
    return res.send({
        status: 200,
        message: 'Recipe',
        recipes: recipesResult.data,
    })
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

export const getRecipeUserHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await supabase
        .from<Recipe>('recipes')
        .select(`*,user(*)`)
        .eq('created_by', id)
    const user: SuccessAuthUser = {
        id: result.data[0].user.id,
        username: result.data[0].user.username,
        firstname: result.data[0].user.firstname,
        lastname: result.data[0].user.lastname,
        followers: result.data[0].user.followers,
        following: result.data[0].user.following,
        avatar: result.data[0].user.avatar,
        generated_avatar: result.data[0].user.generated_avatar,
        email: result.data[0].user.email,
        access_jwt_token: '',
    }
    result.status === 200 ? res.send(user) : res.sendStatus(500)
}

export const getRecipeImageHandler = async (req: Request, res: Response) => {
    const { name } = req.params
    const image = await (
        await supabase.storage.from('images').createSignedUrl(name, 60)
    ).signedURL

    if (!image) {
        logger.error(`No image found for recipe ${name}`)
        return res.sendStatus(404)
    }
    return res.status(200).send({ status: 200, url: image })
}
