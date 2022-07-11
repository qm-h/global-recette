import { FavoritesRecipe, Followers, User } from '../../../../shared/types'
import { Request, Response } from 'express'

import { logger } from '../../../../server'
import supabase from '../../../../supabase/supabase'

export const saveRecipeToFavoriteHandler = async (
    req: Request,
    res: Response
) => {
    const { recipeID, userID } = req.body
    const saved = await supabase
        .from<FavoritesRecipe>('favorites_recipe')
        .insert({
            recipe_id: recipeID,
            user_id: userID,
        })

    saved.status === 201
        ? res.status(200).send({ status: 200, message: 'Recipe saved' })
        : res.send({ status: 500, message: 'Error saving recipe' })
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
        logger.debug(`${removed.status}`)
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
