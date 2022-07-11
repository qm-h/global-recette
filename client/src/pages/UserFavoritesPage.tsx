import { Grid, Loading, Text, useTheme } from '@nextui-org/react'
import { Recipe, RecipeUser } from '../../../server/src/shared/types'
import { useEffect, useState } from 'react'

import UserFavoritesList from './components/userFavorites/FavoritesList'
import { getAllFavoritesRecipe } from '../router/userRouter'
import { toasterErrorCommon } from '../utils/theme/toaster'
import { useAppContext } from '../utils/context/AppContext'
import { useNavigate } from 'react-router-dom'

const UserFavoritesPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [favorites, setFavorites] = useState<Recipe[]>([])
    const [recipeAuthor, setRecipeAuthor] = useState<RecipeUser[]>()
    const { user } = useAppContext()
    const { isDark } = useTheme()
    const userID: number | undefined = user?.id
    const navigate = useNavigate()
    useEffect(() => {
        if (userID) {
            setIsLoading(true)
            Promise.all([getAllFavoritesRecipe(userID)]).then(([response]) => {
                if (response['status'] === 403) {
                    toasterErrorCommon(
                        isDark,
                        'Votre accès à cette page à été refusé, \n si le problème persiste, \n veuillez contacter nous contacter par mail'
                    )
                    navigate('/')
                } else {
                    setFavorites(response.favorites)
                    setRecipeAuthor(response.users)
                    setIsLoading(false)
                }
            })
        } else {
            navigate('/')
        }
    }, [isDark, navigate, userID])

    return (
        <Grid.Container gap={4} alignItems="center">
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
                        recipeAuthor={recipeAuthor}
                        isDark={false}
                    />
                )}
            </Grid>
        </Grid.Container>
    )
}

export default UserFavoritesPage
