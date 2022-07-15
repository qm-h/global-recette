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

import CardRecipes from './components/recipe/CardRecipes'
import DataNotFound from './components/noDataFound/DataNotFound'
import { Recipe } from '../../../server/src/shared/types'
import { RiSearch2Line } from 'react-icons/ri'
import { getAllRecipesWithUser } from '../router/recipesRouter'
import { useAppContext } from '../utils/context/AppContext'

const ListRecipes = () => {
    const [recipesData, setRecipesData] = useState<Recipe[]>([])
    const [recipeList, setRecipeList] = useState<Recipe[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isFollowing, setIsFollowing] = useState(false)
    const [isUnfollowing, setIsUnfollowing] = useState(false)
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
                    setIsLoading={setIsLoading}
                    isFollowing={isFollowing}
                    setIsFollowing={setIsFollowing}
                    isUnfollowing={isUnfollowing}
                    setIsUnfollowing={setIsUnfollowing}
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
            setIsFollowing(false)
            setIsUnfollowing(false)
        })
    }, [])

    useEffect(() => {
        setRecipeList(recipesData)
    }, [recipesData])

    return (
        <>
            <Card css={{ w: '100%', h: '85%', mt: '$28' }}>
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
                        css={{ w: '50%', boxShadow: 'none' }}
                        clearable
                        bordered={isDark}
                        type="text"
                        aria-label="Search"
                        color="primary"
                        onChange={handleSearchRecipe}
                        contentLeft={<RiSearch2Line />}
                        placeholder="Rechercher une recette"
                    />
                </Row>
                <Card.Body
                    css={{
                        w: '100%',
                        h: '100%',
                        display: 'flex',
                        justifyContent: isLoading && 'center',
                        alignItems: 'center',
                    }}
                >
                    <Grid.Container wrap="wrap" justify="center" gap={2}>
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
