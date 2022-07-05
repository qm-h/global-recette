import {
    Card,
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
import { useAppContext } from '../lib/context/context'

const ListRecipes = () => {
    const [recipesData, setRecipesData] = useState<Recipe[]>([])
    const [recipeList, setRecipeList] = useState<Recipe[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { isDark } = useTheme()
    const { user } = useAppContext()
    const userID: number | undefined = user?.id
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
            return (
                <CardRecipes
                    authUserID={userID}
                    recipes={recipes}
                    isDark={isDark}
                />
            )
        }
    }

    useEffect(() => {
        Promise.all([getAllRecipesWithUser()]).then(([recipes]) => {
            setRecipesData(recipes)
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        setRecipeList(recipesData)
    }, [recipesData])

    return (
        <>
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
                        bordered={isDark ? true : false}
                        aria-label="Search"
                        color="primary"
                        onChange={handleSearchRecipe}
                        placeholder="Rechercher une recette"
                    />
                </Row>
                <Card.Body css={{ p: '2em', w: '100%' }}>
                    <Spacer />
                    <Grid.Container
                        gap={1}
                        wrap="wrap"
                        justify={isLoading ? 'center' : 'space-around'}
                        alignItems="center"
                        alignContent="center"
                    >
                        {isLoading ? (
                            <Loading size="xl" color="primary" />
                        ) : (
                            renderRecipesWithNoData(recipeList)
                        )}
                    </Grid.Container>
                </Card.Body>
            </Card>
        </>
    )
}

export default ListRecipes
