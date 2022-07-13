import {
    ExpressResponseDataType,
    ExpressResponseMessageType,
    FavoritesRecipe,
    FavoritesRecipeWithUser,
    SuccessAuthUser,
    UserRecipesResponse,
} from '../../../server/src/shared/types'

import axios from 'axios'

export function getUserByID(userID: number): Promise<SuccessAuthUser> {
    return axios
        .get(`/api/user/${userID}`)
        .then((res) => res.data)
        .catch((err) => {
            return err
        })
}

export function getRecipeByUserID(
    id: number,
    accessUserUUID
): Promise<UserRecipesResponse> {
    return axios
        .post(`/api/recipe/user/${id}`, {
            userUUID: accessUserUUID,
            userID: id,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getAllPublishedRecipeByUserID(
    userID: number,
    accessUserUUID: string
): Promise<UserRecipesResponse> {
    return axios
        .post(`/api/recipe/user/published/${userID}`, {
            userID: userID,
            userUUID: accessUserUUID,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function saveRecipeToFavorite(
    recipeID,
    userID
): Promise<ExpressResponseMessageType> {
    return axios
        .post(`/api/user/savetofavorite`, {
            recipeID: recipeID,
            userID: userID,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getSavedRecipes(userID): Promise<FavoritesRecipe[]> {
    return axios
        .get(`/api/user/getsavedrecipes/${userID}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function removeSavedRecipe(
    recipeID,
    userID
): Promise<ExpressResponseMessageType> {
    return axios
        .post(`/api/user/removesavedrecipe`, {
            recipeID: recipeID,
            userID: userID,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getAllFavoritesRecipe(
    userID: number
): Promise<FavoritesRecipeWithUser> {
    return axios
        .get(`/api/user/getallfavoritesrecipe/${userID}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function followingUser(
    userID: number,
    followingUserID: number
): Promise<ExpressResponseMessageType> {
    console.log(userID, followingUserID)
    return axios
        .post(`/api/user/follow`, {
            userID: userID,
            followingUserID: followingUserID,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function unfollowingUser(
    userID: number,
    followingUserID: number
): Promise<ExpressResponseMessageType> {
    return axios
        .post(`/api/user/unfollowing`, {
            userID: userID,
            followingUserID: followingUserID,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getFollowingUser(
    username: string
): Promise<ExpressResponseDataType> {
    return axios
        .get(`/api/user/following/${username}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function updateAvatar(
    userID: number,
    avatar: string
): Promise<ExpressResponseMessageType> {
    return axios
        .put(`/api/user/updateavatar`, {
            userID: userID,
            avatar: avatar,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}
