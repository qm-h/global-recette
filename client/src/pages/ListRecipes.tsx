import {
    Card,
    Container,
    Grid,
    Input,
    Loading,
    Row,
    Spacer,
    Text,
    useTheme,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'

import CardRecipes from './components/allRecipe/CardRecipes'
import DataNotFound from './components/wrongPage/DataNotFound'
import { Recipe } from '../../../server/src/shared/types'
import { getAllRecipesWithUser } from '../router/recipesRouter'

const ListRecipes = () => {
    const [recipesData, setRecipesData] = useState<Recipe[]>([])
    const [recipeList, setRecipeList] = useState<Recipe[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { isDark } = useTheme()

    const handleSearchRecipe = (event) => {
        let value = event.target.value
        let newList = recipesData.filter((re) =>
            re.name.toLowerCase().startsWith(value.toLowerCase())
        )
        setRecipeList(newList)
    }

    const renderRecipesWithNoData = (recipes: Recipe[]): JSX.Element => {
        if (recipes.length === 0) {
            return <DataNotFound />
        } else {
            return <CardRecipes recipes={recipes} isDark={isDark} />
        }
    }

    useEffect(() => {
        ;(async () => {
            const promiseResult = await Promise.all([getAllRecipesWithUser()])
            setRecipesData(promiseResult[0])
            setIsLoading(false)
        })()
    }, [])

    useEffect(() => {
        setRecipeList(recipesData)
    }, [recipesData])

    return (
        <Container
            css={{
                h: '100vh',
                w: '90%',
            }}
            display="flex"
            justify="center"
            alignItems="center"
            responsive
        >
            <Card css={{ w: '100%', h: '85%', mt: '$28', borderRadius: '6px' }}>
                <Card.Header>
                    <Row justify="center">
                        <Text h2 b>
                            Recette du Moment 🚀
                        </Text>
                    </Row>
                </Card.Header>
                <Spacer />
                <Row justify="center">
                    <Input
                        css={{ w: '50%' }}
                        clearable
                        bordered
                        aria-label="Search"
                        color="primary"
                        onChange={handleSearchRecipe}
                        placeholder="Rechercher une recette"
                    />
                </Row>
                <Card.Body css={{ p: '2em', w: '100%' }}>
                    <Spacer />
                    <Grid.Container
                        gap={2}
                        wrap="wrap"
                        justify={isLoading ? 'center' : 'space-around'}
                        alignItems="center"
                        alignContent="center"
                    >
                        {isLoading ? (
                            <Loading type="points" />
                        ) : (
                            renderRecipesWithNoData(recipeList)
                        )}
                    </Grid.Container>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ListRecipes
