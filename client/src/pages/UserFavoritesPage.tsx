import { Grid, Loading, Text, useTheme } from '@nextui-org/react'
import { Recipe, RecipeUser } from '../../../server/src/shared/types'
import { useEffect, useState } from 'react'

import UserFavoritesList from './components/userFavorites/FavoritesList'
import { getAllFavoritesRecipe } from '../router/userRouter'
import { toasterErrorCommon } from '../utils/theme/toaster'
import { useAppContext } from '../utils/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

const UserFavoritesPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [favorites, setFavorites] = useState<Recipe[]>([])
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
                    setIsLoading(false)
                }
            })
        } else {
            navigate('/')
        }
    }, [isDark, navigate, userID])

    return (
        <Grid.Container
            gap={!isMobile && 4}
            justify={'center'}
            alignItems="center"
        >
            <Grid md={12} justify="center">
                <Text h2={!isMobile} h3={isMobile}>
                    Mes Favoris ❤️
                </Text>
            </Grid>
            <Grid xs={12} md={12} justify="center">
                {isLoading ? (
                    <Loading size="xl" />
                ) : (
                    <UserFavoritesList
                        authUserID={user.id}
                        isMobile={isMobile}
                        favorites={favorites}
                        isDark={false}
                    />
                )}
            </Grid>
        </Grid.Container>
    )
}

export default UserFavoritesPage
