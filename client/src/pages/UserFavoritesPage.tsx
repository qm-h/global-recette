import { Grid, Loading, Text } from '@nextui-org/react'
import { Recipe, RecipeUser } from '../../../server/src/shared/types'
import { useEffect, useState } from 'react'

import UserFavoritesList from './components/userFavorites/FavoritesList'
import { getAllFavoritesRecipe } from '../router/userRouter'
import { useAppContext } from '../lib/context/context'

const UserFavoritesPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [favorites, setFavorites] = useState<Recipe[]>([])
    const [recipeAuthor, setRecipeAuthor] = useState<RecipeUser[]>()
    const { user } = useAppContext()
    const userID: number | undefined = user?.id

    useEffect(() => {
        setIsLoading(true)

        Promise.all([getAllFavoritesRecipe(userID)]).then(([response]) => {
            setFavorites(response.favorites)
            setRecipeAuthor(response.users)
            setIsLoading(false)
        })
    }, [userID])

    return (
        <Grid.Container gap={5} alignItems="center">
            <Grid md={12} justify="center">
                <Text h2>Mes Favoris</Text>
            </Grid>
            <Grid md={12} justify="center">
                {isLoading ? (
                    <Loading size="xl" />
                ) : (
                    <UserFavoritesList
                        authUserID={user.id}
                        favorites={favorites}
                        isDark={false}
                    />
                )}
            </Grid>
        </Grid.Container>
    )
}

export default UserFavoritesPage
