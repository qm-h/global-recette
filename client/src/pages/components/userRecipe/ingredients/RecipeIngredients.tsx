import {
    Ingredients,
    Recipe,
    RecipeIngredientWithQuantity,
} from '../../../../../../server/src/shared/types'
import { Col, Loading, Row, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { getAllIngredientsByRecipeID } from '../../../../router/ingredientsRouter'

interface Props {
    recipe: Recipe
}

const RecipeIngredients = ({ recipe }: Props) => {
    const [ingredients, setIngredients] = useState<
        RecipeIngredientWithQuantity[]
    >([] as RecipeIngredientWithQuantity[])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        setIsLoading(true)
        Promise.all([getAllIngredientsByRecipeID(recipe.id)]).then(
            ([ingredientsData]) => {
                setIngredients([...ingredientsData])
                setIsLoading(false)
            }
        )
    }, [recipe])

    return (
        <>
            {!isLoading && ingredients.length !== 0 ? (
                ingredients.map((ing, index) => (
                    <Row
                        key={index}
                        justify="space-between"
                        align="center"
                        css={{
                            p: '0',
                        }}
                    >
                        <Col
                            css={{
                                m: '$0',
                                mr: '$5',
                            }}
                        >
                            <Text color={'white'}>{ing.ingredients.name}</Text>
                        </Col>
                        <Col
                            css={{
                                m: '$0',
                                ml: '$5',
                            }}
                        >
                            <Text color={'white'}>{ing.quantity}</Text>
                        </Col>
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
