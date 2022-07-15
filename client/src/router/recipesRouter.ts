import {
    ExpressResponseUrlType,
    Recipe,
    RecipeIngredient,
    SuccessAuthUser,
} from '../../../server/src/shared/types'

import { ExpressResponseMessageType } from './../../../server/src/shared/types'
import axios from 'axios'

export function getAllRecipesWithUser(): Promise<Recipe[]> {
    return axios
        .get('/api/recipe')
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getRecipeByID(id: number): Promise<Recipe> {
    return axios
        .get(`/api/recipe/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getRecipeUser(id: number): Promise<SuccessAuthUser> {
    return axios
        .get(`/api/recipe/user/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getRecipeByName(recipeName: string): Promise<Recipe> {
    return axios
        .post(`/api/recipe/name`, { recipeName: recipeName })
        .then((res) => res.data[0])
        .catch((err) => console.log(err))
}

export function getRecipeImage(name: string): Promise<ExpressResponseUrlType> {
    return axios
        .get(`/api/recipe/image/${name}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function createRecipe(
    recipe: Recipe
): Promise<ExpressResponseMessageType> {
    return axios
        .post('/api/recipe/createrecipe', {
            name: recipe.name,
            origin: recipe.origin,
            note: recipe.note,
            user_id: recipe.created_by,
            created_at: recipe.created_at,
            creator_username: recipe.creator_username,
            image_path: recipe.image_path,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function uploadRecipeImage(
    formData: FormData
): Promise<ExpressResponseUrlType> {
    return axios
        .post('/api/recipe/uploadimage', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function saveImageUUID(
    imageUUID: string,
    imagePath: string
): Promise<ExpressResponseMessageType> {
    return axios
        .post('/api/recipe/saveimageuuid', {
            imageUUID: imageUUID,
            imagePath: imagePath,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function insertRecipeIngredients(
    recipeIngredient: RecipeIngredient
): Promise<ExpressResponseMessageType> {
    return axios
        .post('/api/recipe/insertrecipeingredient', {
            recipeIngredient: recipeIngredient,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function publishRecipe(id: number): Promise<ExpressResponseMessageType> {
    return axios
        .post(`/api/recipe/publish`, { id: id })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function unpublishRecipe(
    id: number
): Promise<ExpressResponseMessageType> {
    return axios
        .post(`/api/recipe/unpublish`, { id: id })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function updateRecipe(
    data: Recipe
): Promise<ExpressResponseMessageType> {
    return axios
        .put('/api/recipe/updaterecipe', {
            id: data.id,
            name: data.name,
            note: data.note,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function deleteRecipe(id: number): Promise<ExpressResponseMessageType> {
    return axios
        .delete(`/api/recipe/delete/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function deleteRecipeIngredient(
    id: number
): Promise<ExpressResponseMessageType> {
    return axios
        .delete(`/api/recipe/delete/recipeingredient/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}
