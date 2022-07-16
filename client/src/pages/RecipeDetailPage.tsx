import {
    Grid,
    Col,
    Row,
    Text,
    useTheme,
    Avatar,
    Input,
    Card,
} from '@nextui-org/react'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { getRecipeByID, getRecipeImage } from '../router/recipesRouter'
import {
    Recipe,
    RecipeIngredientWithQuantity,
    SuccessAuthUser,
} from '../../../server/src/shared/types'
import RecipeDetailImage from './components/recipeDetail/RecipeDetailImage'
import { getUserByID } from '../router/userRouter'
import { getAllIngredientsByRecipeID } from '../router/ingredientsRouter'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import parse from 'html-react-parser'
import RecipeDetailFirstCol from './components/recipeDetail/RecipeDetailFirstCol'
import { isMobile } from 'react-device-detect'

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
                mt: '$28',
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
