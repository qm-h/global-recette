import {
    ExpressResponseMessageType,
    RecipeIngredientWithQuantity,
} from './../../../server/src/shared/types'
import { Ingredients } from '../../../server/src/shared/types'
import axios from 'axios'

export function getAllIngredients(): Promise<Ingredients[]> {
    return axios
        .get(`/api/ingredients`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getAllIngredientByID(id: number): Promise<Ingredients> {
    return axios
        .get(`/api/ingredients/${id}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getAllIngredientsByRecipeID(
    recipeID: number
): Promise<RecipeIngredientWithQuantity[]> {
    return axios
        .get(`/api/ingredients/recipe/${recipeID}`)
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function getIngredientByName(
    ingredients: Ingredients[]
): Promise<Ingredients[]> {
    return axios
        .post(`/api/ingredients/ingredientbyname`, { ingredients: ingredients })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}

export function createIngredient(
    ingredient: string
): Promise<ExpressResponseMessageType> {
    return axios
        .post(`/api/ingredients/create`, { ingredient: ingredient })
        .then((res) => res.data)
        .catch((err) => console.log(err))
}
