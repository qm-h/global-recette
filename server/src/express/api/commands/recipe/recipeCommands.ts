import {
    FavoritesRecipe,
    ImageUUIDBridge,
    Recipe,
} from '../../../../shared/types'
import { Request, Response } from 'express'

import { logger } from '../../../../server'
import supabase from '../../../../supabase/supabase'

export const createRecipeHandler = async (req: Request, res: Response) => {
    const {
        name,
        origin,
        note,
        user_id,
        created_at,
        creator_username,
        image_path,
    } = req.body
    const result = await supabase.from<Recipe>('recipes').insert([
        {
            name: name,
            origin: origin,
            note: note,
            created_by: user_id,
            created_at: created_at,
            creator_username: creator_username,
            image_path: image_path,
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

export const uploadImageHandler = async (req, res: Response) => {
    const { image } = req.files
    const savedImageResult = await supabase.storage
        .from('images')
        .upload(image.name, image.data)
    logger.debug(`saved image: ${JSON.stringify(savedImageResult)}`)
    if (!savedImageResult.data) {
        logger.error(`Error: ${JSON.stringify(savedImageResult.error)}`)
        return res
            .status(500)
            .send({ status: 500, message: 'Erreur lors de la création' })
    }
    return res.status(200).send({ status: 200, message: 'Création réussie' })
}

export const savedImageUUIDHandler = async (req, res: Response) => {
    const { imageUUID, imagePath } = req.body

    const savedUUIDResult = await supabase
        .from<ImageUUIDBridge>('image_uuid_bridge')
        .insert([
            {
                image_uuid: imageUUID,
                image_path: imagePath,
            },
        ])
    if (savedUUIDResult.status === 400) {
        console.log('error', savedUUIDResult.error)
        return res
            .status(500)
            .send({ status: 500, message: 'Erreur lors de la création' })
    }

    return res.status(200).send({ status: 200, message: 'Création réussie' })
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

    const recipe = await supabase
        .from<Recipe>('recipes')
        .select('image_path')
        .eq('id', id)
    const imagePath = recipe.data[0].image_path

    const removeFavoriteResult = await supabase
        .from('favorites_recipe')
        .delete()
        .eq('recipe_id', id)

    const removeImageBridgeResult = await supabase
        .from<ImageUUIDBridge>('image_uuid_bridge')
        .delete()
        .eq('image_path', imagePath)

    const result = await supabase
        .from('recipe_ingredient')
        .delete()
        .eq('recipe_id', id)
    const removeRecipeResult = await supabase
        .from<Recipe>('recipes')
        .delete()
        .eq('id', id)

    if (removeFavoriteResult.status === 400) {
        logger.error(`Error: ${JSON.stringify(removeFavoriteResult.error)}`)
        return res
            .status(500)
            .send({ status: 500, message: 'Erreur lors de la suppression' })
    }

    if (removeImageBridgeResult.status === 400) {
        logger.error(`Error: ${JSON.stringify(removeImageBridgeResult.error)}`)
        return res
            .status(500)
            .send({ status: 500, message: 'Erreur lors de la suppression' })
    }
    if (result.status === 400) {
        logger.error(JSON.stringify(result.error))
        return res
            .status(500)
            .send({ status: 500, message: 'Erreur lors de la suppression' })
    }
    if (removeRecipeResult.status === 409) {
        logger.error(JSON.stringify(removeRecipeResult.error))
        return res
            .status(500)
            .send({ status: 500, message: 'Erreur lors de la suppression' })
    }

    return res.status(200).send({ status: 200, message: 'Suppression réussie' })
}
