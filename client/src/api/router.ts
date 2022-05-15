import { Recipes } from '../../../server/share/types'
import axios from 'axios'

export const getAllRecipes: Promise<Recipes[]> = axios
    .get('http://localhost:3001')
    .then((res) => res.data)
    .catch((err) => console.log(err))

export const addRecipe = (data: Recipes) => {
    axios
        .post('/addRecipes', {
            name: data.name,
            details: data.details,
        })
        .then((r) => r)
        .catch((err) => console.log(err))
}
