import { FullRecette, Ingredients, Recipe } from '../../../server/shared/types'
import axios from 'axios'

export function getAllRecipes(): Promise<Recipe[]> {
    return axios
        .get('http://localhost:3001')
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getRecipesById(id: string): Promise<Recipe> {
    return axios
        .get(`http://localhost:3001/recipe/${id}`)
        .then((res) => res.data[0])
        .catch((err) => console.log(err))
}

export function getRecipesIngredients(id: string): Promise<Ingredients[]> {
    return axios
        .get(`http://localhost:3001/ingredients/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function addRecipe(data: Recipe): Promise<number | void> {
    return axios
        .post('/addrecipe', {
            nomRecette: data.nomRecette,
            origine: data.origine,
            description: data.description,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function addIngredients(data: Ingredients): Promise<number | void> {
    return axios
        .post('/addingredient', {
            nomIngredient: data.nomIngredient,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function addRecipeIngredients(
    data: FullRecette
): Promise<number | void> {
    return axios
        .post('/addrecipeingredient', {
            idIngredient: data.idIngredient,
            idRecette: data.idRecette,
        })
        .then((res) => res.status)
        .catch((err) => console.log(err))
}

export function updateRecipe(data: Recipe): Promise<number | void> {
    return axios
        .post('/updaterecipe', {
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
        .get(`http://localhost:3001/delete/recipe/${id}`)
        .then((res) => res.status)
        .catch((err) => console.log(err))
}
