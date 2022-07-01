import { Recipe, RecipeIngredient } from '../../../server/src/shared/types'

import axios from 'axios'

export function getAllRecipesWithUser(): Promise<Recipe[]> {
    return axios
        .get('/api/recipe')
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getRecipesByID(id: number): Promise<Recipe> {
    return axios
        .get(`/api/recipe/${id}`)
        .then((res) => res.data[0])
        .catch((err) => console.log(err))
}

export function getRecipeByName(recipeName: string): Promise<Recipe> {
    return axios
        .post(`/api/recipe/name`, { recipeName: recipeName })
        .then((res) => res.data[0])
        .catch((err) => console.log(err))
}

export function getRecipeByUserID(
    id: number,
    accessUserUUID
): Promise<Recipe[]> {
    return axios
        .post(`/api/recipe/user/${id}`, {
            userUUID: accessUserUUID,
            userID: id,
        })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function createRecipe(recipe: Recipe) {
    return axios
        .post('/api/recipe/createrecipe', {
            name: recipe.name,
            origin: recipe.origin,
            note: recipe.note,
            user_id: recipe.user_id,
            created_at: recipe.created_at,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function insertRecipeIngredients(
    recipeIngredient: RecipeIngredient
): Promise<number | void> {
    return axios
        .post('/api/recipe/insertrecipeingredient', {
            recipeIngredient: recipeIngredient,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function publishRecipe(id: number): Promise<number | void> {
    return axios
        .post(`/api/recipe/publish`, { id: id })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function unpublishRecipe(id: number): Promise<number | void> {
    return axios
        .post(`/api/recipe/unpublish`, { id: id })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function updateRecipe(data: Recipe): Promise<number | void> {
    return axios
        .put('/api/recipe/updaterecipe', {
            id: data.id,
            name: data.name,
            note: data.note,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function deleteRecipe(id: number): Promise<number | void> {
    console.log(id)
    return axios
        .delete(`/api/recipe/delete/${id}`)
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function deleteRecipeIngredient(id: number): Promise<number | void> {
    console.log(id)
    return axios
        .delete(`/api/recipe/delete/recipeingredient/${id}`)
        .then((res) => res.status)
        .catch((err) => console.log(err))
}
