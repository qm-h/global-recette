import { Ingredients, Recipe } from '../../../../../../server/src/shared/types'
import { Loading, Row, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { getAllIngredientsByRecipeID } from '../../../../router/ingredientsRouter'

interface Props {
    recipe: Recipe
}

const RecipeIngredients = ({ recipe }: Props) => {
    const [ingredientsData, setIngredientsData] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        setIsLoading(true)
        Promise.all([getAllIngredientsByRecipeID(recipe.id)]).then(
            ([ingredients]) => {
                setIngredientsData([...ingredients])
                setIsLoading(false)
            }
        )
    }, [recipe])

    return (
        <>
            {!isLoading && ingredientsData.length !== 0 ? (
                ingredientsData.map((ing, index) => (
                    <Row
                        key={index}
                        justify="center"
                        align="center"
                        css={{ p: '$5' }}
                    >
                        <ul>
                            <li className="liStyle">
                                <Text>{ing.ingredients.name}</Text>
                            </li>
                        </ul>
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
