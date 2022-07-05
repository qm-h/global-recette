import { Request, Response } from 'express'

import { Recipe } from '../../../../shared/types'
import { logger } from '../../../../server'
import { supabase } from './../../../../database/supabase'

export const createRecipeHandler = async (req: Request, res: Response) => {
    const { name, origin, note, user_id, created_at } = req.body
    const result = await supabase.from<Recipe>('recipes').insert([
        {
            name: name,
            origin: origin,
            note: note,
            created_by: user_id,
            created_at: created_at,
        },
    ])
    if (result.status === 400) {
        console.log('error', result.error)
    }
    result.status === 201
        ? res.status(200).send({ status: 200, message: 'Création réussie' })
        : res
              .status(500)
              .send({ status: 500, message: 'Erreur lors de la création' })
}

export const publishRecipeHandler = async (req: Request, res: Response) => {
    const { id } = req.body
    const result = await supabase
        .from<Recipe>('recipes')
        .update({ published: true })
        .eq('id', id)
    result.status === 200
        ? res.status(200).send({ status: 200, message: 'Publication réussie' })
        : res
              .status(500)
              .send({ status: 500, message: 'Erreur lors de la publication' })
}

export const unpublishRecipeHandler = async (req: Request, res: Response) => {
    const { id } = req.body
    const result = await supabase
        .from<Recipe>('recipes')
        .update({ published: false })
        .eq('id', id)
    result.status === 200
        ? res
              .status(200)
              .send({ status: 200, message: 'Dépublication réussie' })
        : res
              .status(500)
              .send({ status: 500, message: 'Erreur lors de la dépublication' })
}

export const deleteRecipeHandler = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await supabase
        .from('recipe_ingredient')
        .delete()
        .eq('recipe_id', id)
    const removeRecipeResult = await supabase
        .from<Recipe>('recipes')
        .delete()
        .eq('id', id)

    if (result.status === 400) {
        logger.error(JSON.stringify(result.error))
    }
    if (removeRecipeResult.status === 409) {
        logger.error(JSON.stringify(removeRecipeResult.error))
    }

    result.status === 200
        ? res.status(200).send({ status: 200, message: 'Suppression réussie' })
        : res
              .status(500)
              .send({ status: 500, message: 'Erreur lors de la suppression' })
}
