import {
    Button,
    Card,
    Col,
    Container,
    Grid,
    Loading,
    Row,
    Spacer,
    Text,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'

import UserCreateRecipeComponent from './components/userRecipe/UserCreateRecipeComponent'
import UserRecipeList from './components/userRecipe/UserRecipeListComponent'
import { getRecipeByUserID } from '../api/recipesRouter'
import { useAppContext } from '../lib/context/Context'

const UserRecipePage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [userRecipes, setUserRecipes] = useState<any[]>([])
    const [createRecipe, setCreateRecipe] = useState<boolean>(false)

    const { user } = useAppContext()
    console.log(user)

    useEffect(() => {
        setIsLoading(true)
        Promise.all([getRecipeByUserID(3)])
            .then(([recipe]) => {
                console.log(recipe)

                if (recipe) {
                    setUserRecipes(recipe)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [user])

    return (
        <Container
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                h: '100vh',
                w: '90%',
            }}
        >
            {createRecipe ? (
                <UserCreateRecipeComponent setCreate={setCreateRecipe} />
            ) : (
                <Card css={{ h: '80%', borderRadius: '6px' }}>
                    <Card.Header>
                        <Grid.Container gap={4} alignItems="center">
                            <Grid xs={6} md={7}>
                                <Text h1 b>
                                    Mes Recettes 🍉
                                </Text>
                            </Grid>
                            <Grid xs={6} md={5} justify="flex-end">
                                <Button
                                    auto
                                    flat
                                    onPress={() => setCreateRecipe(true)}
                                >
                                    Créer une recette
                                </Button>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Spacer />
                    <Card.Body css={{ p: '2em', w: '100%' }}>
                        <Spacer />
                        <Grid.Container
                            gap={4}
                            wrap="wrap"
                            justify={isLoading ? 'flex-start' : 'space-around'}
                            alignItems="center"
                            alignContent="center"
                        >
                            {isLoading ? (
                                <Loading color="warning" type="points" />
                            ) : (
                                userRecipes.map((r, i) => (
                                    <UserRecipeList recipe={r} index={i} />
                                ))
                            )}
                        </Grid.Container>
                    </Card.Body>
                </Card>
            )}
        </Container>
    )
}

export default UserRecipePage
