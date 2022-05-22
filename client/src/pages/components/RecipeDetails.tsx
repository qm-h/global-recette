import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Ingredients, Recipe } from '../../../../server/shared/types'
import { getRecipesById, getRecipesIngredients } from '../../api/router'

const RecipeDetails = () => {
    const [recipeData, setRecipeData] = useState<Recipe>()
    const [ingredientsData, setIngredientsData] = useState<Ingredients[]>([])
    const { id } = useParams()

    console.log(ingredientsData)

    useEffect(() => {
        Promise.all([getRecipesById(id), getRecipesIngredients(id)]).then(
            ([recipe, ingredients]) => {
                setRecipeData(recipe)
                setIngredientsData(ingredients)
            }
        )
    }, [id])

    const recipeDetail = (recipe: Recipe) => (
        <>
            <p>{recipe.nomRecette}</p>
            <p>{recipe.origine}</p>
            <p>{recipe.description}</p>
        </>
    )

    return (
        <div className="card">
            <Link to={'/'}>Retour</Link>
            <h1>Detail</h1>
            <div>{recipeData ? recipeDetail(recipeData) : 'aucun'}</div>
            <div>
                {ingredientsData
                    ? ingredientsData.map((ing, index) => (
                          <p key={index}>{ing.nomIngredient}</p>
                      ))
                    : 'aucun'}
            </div>
        </div>
    )
}

export default RecipeDetails
