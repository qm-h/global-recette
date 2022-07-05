import { Ingredients, Recipe } from '../../../../../../server/src/shared/types'
import { Loading, Row, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { getAllIngredientsByRecipeID } from '../../../../router/ingredientsRouter'

interface Props {
    recipe: Recipe
}

const RecipeIngredients = ({ recipe }: Props) => {
    const [ingredients, setIngredients] = useState<Ingredients[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        setIsLoading(true)
        Promise.all([getAllIngredientsByRecipeID(recipe.id)]).then(
            ([ingredients]) => {
                setIngredients(ingredients)
                setIsLoading(false)
            }
        )
    }, [recipe])
    console.log(ingredients)

    return (
        <>
            {!isLoading && ingredients.length !== 0 ? (
                ingredients.map((ingredient, index) => (
                    <Row
                        key={index}
                        justify="flex-start"
                        css={{ mb: '$5', ml: '$2', w: 'auto' }}
                    >
                        <Text b color="#9F9F9F">
                            {ingredient.name}
                        </Text>
                    </Row>
                ))
            ) : (
                <Row justify="flex-start" css={{ p: '$5' }}>
                    <Loading color="currentColor" size="sm" />
                </Row>
            )}
        </>
    )
}

export default RecipeIngredients
