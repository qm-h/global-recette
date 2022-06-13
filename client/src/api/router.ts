import { FullRecette, Ingredients, Recipe } from '../../../server/shared/types'

import axios from 'axios'

export function getAllRecipes(): Promise<Recipe[]> {
    return axios
        .get('/api/')
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getRecipesById(id: string): Promise<Recipe> {
    return axios
        .get(`/api/recipe/${id}`)
        .then((res) => res.data[0])
        .catch((err) => console.log(err))
}

export function getRecipesIngredients(id: string): Promise<Ingredients[]> {
    return axios
        .get(`/api/ingredients/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getAllIngredients(): Promise<Ingredients[]> {
    return axios
        .get(`/api/ingredients`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function addRecipe(data: Recipe): Promise<number | void> {
    console.log(data)

    return axios
        .post('/api/addrecipe', {
            nomRecette: data.nomRecette,
            origine: data.origine,
            description: data.description,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function addIngredients(data: Ingredients): Promise<number | void> {
    return axios
        .post('/api/addingredient', {
            nomIngredient: data.nomIngredient,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function addRecipeIngredients(
    data: FullRecette
): Promise<number | void> {
    console.log(data)

    return axios
        .post('/api/addrecipeingredient', {
            idIngredient: data.idIngredient,
            idRecette: data.idRecette,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function updateRecipe(data: Recipe): Promise<number | void> {
    return axios
        .put('/api/updaterecipe', {
            idRecette: data.idRecette,
            nomRecette: data.nomRecette,
            description: data.description,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function deleteRecipe(id: number): Promise<number | void> {
    return axios
        .delete(`/api/delete/recipe/${id}`)
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function deleteRecipeIngredient(id: number): Promise<number | void> {
    console.log(id)
    return axios
        .delete(`/api/delete/recipeingredient/${id}`)
        .then((res) => res.status)
        .catch((err) => console.log(err))
}
