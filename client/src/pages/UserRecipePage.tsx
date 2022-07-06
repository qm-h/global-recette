import {
    Button,
    Card,
    Grid,
    Loading,
    Row,
    Spacer,
    Text,
    useTheme,
} from '@nextui-org/react'
import { Ingredients, Recipe } from '../../../server/src/shared/types'
import { useEffect, useState } from 'react'

import DataNotFound from './components/wrongPage/DataNotFound'
import UserCreateRecipeComponent from './components/userRecipe/UserCreateRecipeComponent'
import UserRecipeList from './components/userRecipe/UserRecipeList'
import { getAllIngredients } from '../router/ingredientsRouter'
import { getRecipeByUserID } from '../router/recipesRouter'
import { useAppContext } from '../utils/context/AppContext'
import { useNavigate } from 'react-router-dom'

const UserRecipePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userRecipes, setUserRecipes] = useState<Recipe[]>([])
    const [ingredients, setIngredients] = useState<Ingredients[]>([])
    const [createRecipe, setCreateRecipe] = useState<boolean>(false)
    const { user, userUUID } = useAppContext()
    const navigate = useNavigate()
    const { isDark } = useTheme()
    const fetchRecipe = async () => {
        Promise.all([getRecipeByUserID(user.id, userUUID)]).then(
            ([recipes]) => {
                setUserRecipes(recipes)
                setIsLoading(false)
            }
        )
    }

    useEffect(() => {
        if (user) {
            setIsLoading(true)
            Promise.all([
                getRecipeByUserID(user.id, userUUID),
                getAllIngredients(),
            ])
                .then(([recipe, ingredients]) => {
                    setUserRecipes(recipe)
                    setIngredients(ingredients)
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            navigate('/')
        }
    }, [user, userUUID, createRecipe, navigate, isDark])

    const renderRecipesWithNoData = (recipes: Recipe[]): JSX.Element => {
        if (recipes.length === 0) {
            return <DataNotFound setCreateRecipe={setCreateRecipe} />
        } else {
            return (
                <UserRecipeList fetchRecipe={fetchRecipe} recipes={recipes} />
            )
        }
    }

    return (
        <>
            {createRecipe ? (
                <UserCreateRecipeComponent
                    setCreate={setCreateRecipe}
                    ingredients={ingredients}
                />
            ) : (
                <Card
                    css={{
                        h: '85%',
                        borderRadius: '6px',
                        w: '100%',
                        mt: '$28',
                    }}
                >
                    <Card.Header>
                        <Grid.Container gap={4} alignItems="center">
                            <Grid xs={6} md={7}>
                                <Text h2 b>
                                    Mes Recettes 🍉
                                </Text>
                            </Grid>
                            <Grid xs={6} md={5} justify="flex-end">
                                {!isLoading && userRecipes.length !== 0 && (
                                    <Button
                                        auto
                                        color={'success'}
                                        flat
                                        onPress={() => setCreateRecipe(true)}
                                    >
                                        Créer une recette
                                    </Button>
                                )}
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Spacer />
                    <Card.Body css={{ w: '100%' }}>
                        <Spacer />
                        <Grid.Container
                            justify={isLoading ? 'flex-start' : 'space-around'}
                            alignItems="center"
                            alignContent="center"
                        >
                            {isLoading ? (
                                <Row justify="center">
                                    <Loading size="xl" color="primary" />
                                </Row>
                            ) : (
                                renderRecipesWithNoData(userRecipes)
                            )}
                        </Grid.Container>
                    </Card.Body>
                    {!isLoading && userRecipes.length === 0 && (
                        <Card.Footer>
                            <Row gap={2} justify="center">
                                <Button
                                    auto
                                    flat
                                    color={'success'}
                                    onPress={() => setCreateRecipe(true)}
                                >
                                    Créer une recette 🥗
                                </Button>
                            </Row>
                        </Card.Footer>
                    )}
                </Card>
            )}
        </>
    )
}

export default UserRecipePage
