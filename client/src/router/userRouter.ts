import {
    ExpressResponseMessageType,
    FavoritesRecipe,
    FavoritesRecipeWithUser,
    RecipeUser,
} from '../../../server/src/shared/types'

import axios from 'axios'

export function getUserByID(userID: number): Promise<RecipeUser> {
    return axios
        .get(`/api/user/${userID}`)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        })
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
