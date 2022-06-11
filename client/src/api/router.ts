import { FullRecette, Ingredients, Recipe } from '../../../server/shared/types'

import axios from 'axios'

export function getAllRecipes(): Promise<Recipe[]> {
    return axios
        .get('http://localhost:3001/api/')
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getRecipesById(id: string): Promise<Recipe> {
    return axios
        .get(`http://localhost:3001/api/recipe/${id}`)
        .then((res) => res.data[0])
        .catch((err) => console.log(err))
}

export function getRecipesIngredients(id: string): Promise<Ingredients[]> {
    return axios
        .get(`http://localhost:3001/api/ingredients/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function addRecipe(data: Recipe): Promise<number | void> {
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
        .post('/api/updaterecipe', {
            idRecette: data.idRecette,
            nomRecette: data.nomRecette,
            origine: data.origine,
            description: data.description,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function deleteRecipesIngredients(id: string): Promise<number | void> {
    return axios
        .get(`http://localhost:3001/api/delete/recipe/${id}`)
        .then((res) => res.status)
        .catch((err) => console.log(err))
}
