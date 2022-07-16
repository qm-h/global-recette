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

const RecipeDetailPage = () => {
    const [recipe, setRecipe] = useState<Recipe>()
    const [ingredients, setIngredients] = useState<
        RecipeIngredientWithQuantity[]
    >([] as RecipeIngredientWithQuantity[])
    const [user, setUser] = useState<SuccessAuthUser>()
    const [image, setImage] = useState<string>()
    const [editorHeight, setEditorHeight] = useState<number>()
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
                mt: '$28',
            }}
            gap={2}
        >
            <Row gap={2}>
                <Col
                    css={{
                        p: '$5',
                        w: '100%',
                    }}
                >
                    <Grid md={12}>
                        <RecipeDetailImage
                            isDark={isDark}
                            recipe={recipe}
                            image={image}
                        />
                    </Grid>
                    <Grid md={2} justify={'center'} alignItems="center">
                        <Avatar
                            bordered
                            size="xl"
                            color="success"
                            src={
                                user && user.avatar
                                    ? user?.avatar
                                    : user?.generated_avatar
                            }
                        />
                    </Grid>
                    <Grid md={10} alignItems="center" justify="flex-start">
                        <Text size={20}>
                            <b>{recipe?.creator_username}</b> a pris quelques
                            notes :
                        </Text>
                    </Grid>
                    <Grid>
                        <Row>
                            <Col>
                                <Text h4>Ingredients :</Text>
                            </Col>
                        </Row>
                        {ingredients &&
                            ingredients.map((ingredient, index) => (
                                <Row key={index}>
                                    <Col>
                                        <Text color={'text'} size={16}>
                                            {ingredient.ingredients.name}
                                        </Text>
                                    </Col>
                                    <Col>
                                        <Text color={'text'} size={16}>
                                            Quantité :{' '}
                                            <b>{ingredient.quantity}</b>
                                        </Text>
                                    </Col>
                                </Row>
                            ))}
                    </Grid>
                </Col>
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
            </Row>
        </Grid.Container>
    )
}

export default RecipeDetailPage