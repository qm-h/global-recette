import {
    FavoritesRecipe,
    Followers,
    ImageUUIDBridge,
    Recipe,
    User,
    UserCoverImageUUIDBridge,
} from '../../../../shared/types'
import { Request, Response } from 'express'

import supabase from '../../../../supabase/supabase'
import { logger } from '../../../../server'

export const saveRecipeToFavoriteHandler = async (
    req: Request,
    res: Response
) => {
    const { recipeID, userID } = req.body
    const getRecipeResult = await supabase
        .from<Recipe>('recipes')
        .select('*')
        .eq('id', recipeID)
    const saved = await supabase
        .from<FavoritesRecipe>('favorites_recipe')
        .insert({
            recipe_id: recipeID,
            user_id: userID,
        })
    if (saved.status === 400) {
        console.log('error', saved.error)
        return res.send({ status: 400, message: 'Erreur lors de la création' })
    }

    await supabase
        .from<Recipe>('recipes')
        .update({
            favorites_number: getRecipeResult.data[0].favorites_number + 1,
        })
        .eq('id', recipeID)

    return res.status(200).send({ status: 200, message: 'Création réussie' })
}

export const removeSavedRecipeHandler = async (req: Request, res: Response) => {
    const { recipeID, userID } = req.body
    const removed = await supabase
        .from<FavoritesRecipe>('favorites_recipe')
        .delete()
        .eq('recipe_id', recipeID)
        .eq('user_id', userID)

    removed.status === 200
        ? res.status(200).send({ status: 200, message: 'Recipe removed' })
        : res.send({ status: 500, message: 'Error removing recipe' })
}

export const followingHandler = async (req: Request, res: Response) => {
    const { userID, followingUserID } = req.body
    const follower = await supabase
        .from<User>('user')
        .select()
        .eq('id', followingUserID)
    const following = await supabase
        .from<User>('user')
        .select()
        .eq('id', userID)

    if (follower.status === 200 && following.status === 200) {
        const addedToFollowers = await supabase
            .from<Followers>('followers')
            .insert({
                follower_username: follower.data[0].username,
                user_to_follow: userID,
            })

        const added = await supabase
            .from<User>('user')
            .update({
                followers: following['data'][0].followers + 1,
            })
            .eq('id', userID)
        const added2 = await supabase
            .from<User>('user')
            .update({
                following: follower['data'][0].following + 1,
            })
            .eq('id', followingUserID)

        addedToFollowers.status === 201 &&
        added.status === 200 &&
        added2.status === 200
            ? res.status(200).send({ status: 200, message: 'Follower added' })
            : res.send({ status: 500, message: 'Error adding follower' })
    }
}

export const unfollowingHandler = async (req: Request, res: Response) => {
    const { userID, followingUserID } = req.body
    const follower = await supabase
        .from<User>('user')
        .select()
        .eq('id', followingUserID)
    const following = await supabase
        .from<User>('user')
        .select()
        .eq('id', userID)

    if (follower.status === 200 && following.status === 200) {
        const removedFromFollowers = await supabase
            .from<Followers>('followers')
            .delete()
            .eq('follower_username', follower.data[0].username)
            .eq('user_to_follow', userID)

        const removed = await supabase
            .from<User>('user')
            .update({
                followers: following['data'][0].followers - 1,
            })
            .eq('id', userID)
        const removed2 = await supabase
            .from<User>('user')
            .update({
                following: follower['data'][0].following - 1,
            })
            .eq('id', followingUserID)
        removedFromFollowers.status === 200 &&
        removed.status === 200 &&
        removed2.status === 200
            ? res.status(200).send({ status: 200, message: 'Follower removed' })
            : res.send({ status: 500, message: 'Error removing follower' })
    }
}

export const updateAvatarHandler = async (req: Request, res: Response) => {
    const { userID, avatar } = req.body
    const updated = await supabase
        .from<User>('user')
        .update({
            avatar: avatar,
            generated_avatar: avatar,
        })
        .eq('id', userID)

    updated.status === 200
        ? res.status(200).send({ status: 200, message: 'Avatar updated' })
        : res.send({ status: 500, message: 'Error updating avatar' })
}

export const uploadCoverImageHandler = async (req, res: Response) => {
    const { coverImage } = req.files
    const savedImageResult = await supabase.storage
        .from('images')
        .upload(coverImage.name, coverImage.data)
    logger.debug(`saved image: ${JSON.stringify(savedImageResult)}`)
    if (!savedImageResult.data) {
        logger.error(`Error: ${JSON.stringify(savedImageResult.error)}`)
        return res
            .status(500)
            .send({ status: 500, message: 'Erreur lors de la création' })
    }
    return res.status(200).send({ status: 200, message: 'Création réussie' })
}

export const saveCoverImageUUIDHandler = async (
    req: Request,
    res: Response
) => {
    const { userID, coverImagePath, coverImageUUID } = req.body

    const saved = await supabase
        .from<User>('user')
        .update({
            cover_image_path: coverImagePath,
        })
        .eq('id', userID)

    if (saved.status === 400) {
        console.log('error', saved.error)
        return res.send({ status: 400, message: 'Erreur lors de la création' })
    }
    const savedUUIDResult = await supabase
        .from<UserCoverImageUUIDBridge>('user_cover_image_uuid_bridge')
        .insert([
            {
                cover_image_uuid: coverImageUUID,
                cover_image_path: coverImagePath,
            },
        ])
    logger.debug(`saved image: ${JSON.stringify(savedUUIDResult)}`)
    if (savedUUIDResult.status === 400) {
        console.log('error', savedUUIDResult.error)
        return res
            .status(500)
            .send({ status: 500, message: 'Erreur lors de la création' })
    }

    return res.status(200).send({ status: 200, message: 'Création réussie' })
}

export const updateCoverImageHandler = async (req: Request, res: Response) => {
    const { userID, coverImagePath, coverImageUUID } = req.body
    logger.debug(`coverImagePath: ${coverImagePath}`)
    logger.debug(`coverImageUUID: ${coverImageUUID}`)
    logger.debug(`userID: ${userID}`)
    const getLegacyCoverImageUUID = await supabase
        .from<UserCoverImageUUIDBridge>('user_cover_image_uuid_bridge')
        .select()
        .eq('user_id', userID)

    logger.debug(
        `getLegacyCoverImageUUID: ${JSON.stringify(getLegacyCoverImageUUID)}`
    )

    if (getLegacyCoverImageUUID.status === 200) {
        const removeLegacyCoverImageUUID = await supabase.storage
            .from('images')
            .remove([getLegacyCoverImageUUID.data[0].cover_image_uuid])

        logger.debug(
            `getLegacyCoverImageUUID: ${JSON.stringify(
                removeLegacyCoverImageUUID
            )}`
        )

        if (removeLegacyCoverImageUUID.error) {
            logger.error(
                `ERROR: ${JSON.stringify(removeLegacyCoverImageUUID.error)}`
            )
            return res
                .status(500)
                .send({ status: 500, message: 'Erreur lors de la création' })
        }
    }

    const updated = await supabase
        .from<User>('user')
        .update({
            cover_image_path: coverImagePath,
        })
        .eq('id', userID)
    logger.debug(`updated: ${JSON.stringify(updated)}`)
    if (updated.status === 400) {
        logger.error(`ERROR: ${JSON.stringify(updated.error)}`)
        return res.send({ status: 400, message: 'Erreur lors de la création' })
    }

    const updatedUUIDResult = await supabase
        .from<UserCoverImageUUIDBridge>('user_cover_image_uuid_bridge')
        .update({
            cover_image_path: coverImagePath,
            cover_image_uuid: coverImageUUID,
        })
        .eq('user_id', userID)

    logger.debug(`updatedUUIDResult: ${JSON.stringify(updatedUUIDResult)}`)

    if (updatedUUIDResult.status === 400) {
        logger.error(`ERROR: ${JSON.stringify(updatedUUIDResult.error)}`)
        return res.send({ status: 400, message: 'Erreur lors de la création' })
    }

    return res.status(200).send({ status: 200, message: 'Création réussie' })
}
