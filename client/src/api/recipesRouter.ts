import {
    FullRecette,
    Ingredients,
    Recipe,
} from '../../../server/src/shared/types'

import axios from 'axios'

export function getAllRecipes(): Promise<Recipe[]> {
    return axios
        .get('/api/recipe')
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getAllRecipesWithUser(): Promise<Recipe[]> {
    return axios
        .get('/api/recipe/withUser')
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getRecipesByID(id: number): Promise<Recipe> {
    return axios
        .get(`/api/recipe/${id}`)
        .then((res) => res.data[0])
        .catch((err) => console.log(err))
}

export function getRecipeByUserID(id: number): Promise<Recipe[]> {
    return axios
        .get(`/api/recipe/user/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getRecipesIngredientsByRecipeID(
    id: number
): Promise<Ingredients[]> {
    return axios
        .get(`/api/recipe//ingredients/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getAllIngredients(): Promise<Ingredients[]> {
    return axios
        .get(`/api/recipe/ingredients`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function addRecipe(data: Recipe): Promise<number | void> {
    console.log(data)

    return axios
        .post('/api/recipe/addrecipe', {
            name: data.name,
            origine: data.origine,
            note: data.note,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function addIngredients(data: Ingredients): Promise<number | void> {
    return axios
        .post('/api/recipe/addingredient', {
            nomIngredient: data.name,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function addRecipeIngredients(
    data: FullRecette
): Promise<number | void> {
    console.log(data)

    return axios
        .post('/api/recipe/addrecipeingredient', {
            idIngredient: data.idIngredient,
            idRecette: data.idRecette,
        })
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
    return axios
        .delete(`/api/recipe/delete/recipe/${id}`)
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
