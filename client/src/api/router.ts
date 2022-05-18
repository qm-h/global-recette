import { Ingredients, Recipes } from '../../../server/shared/types'
import axios from 'axios'

export function getAllRecipes(): Promise<Recipes[]> {
    return axios
        .get('http://localhost:3001')
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => console.log(err))
}

export function getRecipesIngredients(id: number): Promise<Ingredients[]> {
    return axios
        .get(`http://localhost:3001/ingredients/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function addRecipe(data: Recipes) {
    return axios
        .post('/addrecipe', {
            nomRecette: data.nomRecette,
            origine: data.origin,
            description: data.description,
        })
        .then((r) => r)
        .catch((err) => console.log(err))
}

export function addRecipesIngredients(data: Ingredients) {
    return axios
        .post('/addRecipesIngredients', {
            name: data.nomIngredient,
        })
        .then((r) => r)
        .catch((err) => console.log(err))
}
