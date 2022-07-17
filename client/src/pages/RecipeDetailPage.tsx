import 'suneditor/dist/css/suneditor.min.css'

import { Card, Col, Grid, Row, Text, useTheme } from '@nextui-org/react'
import {
    Recipe,
    RecipeIngredientWithQuantity,
    SuccessAuthUser,
} from '../../../server/src/shared/types'
import { getRecipeByID, getRecipeImage } from '../router/recipesRouter'
import { useEffect, useState } from 'react'

import RecipeDetailFirstCol from './components/recipeDetail/RecipeDetailFirstCol'
import { getAllIngredientsByRecipeID } from '../router/ingredientsRouter'
import { getUserByID } from '../router/userRouter'
import { isMobile } from 'react-device-detect'
import parse from 'html-react-parser'
import { useParams } from 'react-router-dom'

const RecipeDetailPage = () => {
    const [recipe, setRecipe] = useState<Recipe>()
    const [ingredients, setIngredients] = useState<
        RecipeIngredientWithQuantity[]
    >([] as RecipeIngredientWithQuantity[])
    const [user, setUser] = useState<SuccessAuthUser>()
    const [image, setImage] = useState<string>()
    const { id } = useParams()
    const { isDark } = useTheme()

    useEffect(() => {
        Promise.all([
            getRecipeByID(parseInt(id)),
            getAllIngredientsByRecipeID(parseInt(id)),
        ])
            .then(([recipeData, ingredientsData]) => {
                setRecipe(recipeData[0])
                setIngredients(ingredientsData)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (recipe) {
            Promise.all([
                getRecipeImage(recipe.image_path),
                getUserByID(recipe.created_by),
            ])
                .then(([imageData, userData]) => {
                    setImage(imageData.url)
                    setUser(userData[0])
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [recipe])

    return (
        <Grid.Container
            css={{
                overflowY: 'auto',
                w: '100%',
                m: isMobile ? '0' : '',
                p: isMobile ? '0' : '',
                mt: isMobile ? '$15' : '$28',
            }}
            gap={!isMobile && 2}
        >
            <Row
                gap={!isMobile && 2}
                css={{
                    m: isMobile ? '0' : '',
                    p: isMobile ? '0' : '',
                }}
            >
                <Col
                    css={{
                        p: isMobile ? '$0' : '$5',
                        m: isMobile ? '$0' : '',
                        w: '100%',
                    }}
                >
                    {isMobile ? (
                        <>
                            <RecipeDetailFirstCol
                                isDark={isDark}
                                isMobile={isMobile}
                                recipe={recipe}
                                ingredients={ingredients}
                                user={user}
                                image={image}
                            />
                            <Card
                                borderWeight="bold"
                                variant={'flat'}
                                css={{
                                    w: '100%',
                                    h: '100%',
                                    bg: 'transparent',
                                    p: isMobile ? '$0' : '$7',
                                    mt: isMobile ? '$7' : '$0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'flex-start',
                                }}
                            >
                                <Text h3>Description</Text>
                                {parse(`<div>${recipe?.note}</div>`)}
                            </Card>
                        </>
                    ) : (
                        <RecipeDetailFirstCol
                            isDark={isDark}
                            isMobile={isMobile}
                            recipe={recipe}
                            ingredients={ingredients}
                            user={user}
                            image={image}
                        />
                    )}
                </Col>
                {!isMobile && (
                    <Col
                        css={{
                            w: '100%',
                            h: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Card
                            borderWeight="bold"
                            variant={'flat'}
                            css={{
                                w: '70%',
                                h: '100%',
                                bg: 'transparent',
                                p: '$7',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <Text h3>Description</Text>
                            {parse(`<div>${recipe?.note}</div>`)}
                        </Card>
                    </Col>
                )}
            </Row>
        </Grid.Container>
    )
}

export default RecipeDetailPage
