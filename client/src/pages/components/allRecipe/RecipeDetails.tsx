import { Card } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { Recipe } from '../../../../../server/src/shared/types'

interface Props {
    recipe: Recipe
}

const RecipeDetails = ({ recipe }: Props) => {
    const recipeDetail = (recipe: Recipe) => (
        <>
            <p className="recipe__content--name">{recipe.name}</p>
            <p className="recipe__content--origin">
                <strong>Origine :</strong> {recipe.origin}
            </p>
            <p className="recipe__content--description">{recipe.note}</p>
        </>
    )

    return <>test</>
}

export default RecipeDetails
