import { Card, Grid, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import DataNotFound from '../noDataFound/DataNotFound'
import FavoritesButton from '../common/commonComponents/FavoritesButton'
import { HasSavedRecipe } from '../../../../../server/src/shared/types'
import { getSavedRecipes } from '../../../router/userRouter'
import { useNavigate } from 'react-router-dom'

interface FavoritesListProps {
    favorites: any[]
    isDark: boolean
    authUserID: number
    isMobile: boolean
}

const FavoritesList = ({
    authUserID,
    favorites,
    isDark,
    isMobile,
}: FavoritesListProps) => {
    const [hasSaved, setHasSaved] = useState<HasSavedRecipe[]>([
        {} as HasSavedRecipe,
    ])

    const navigate = useNavigate()

    useEffect(() => {
        Promise.all([getSavedRecipes(authUserID)])
            .then(([res]) => {
                if (res) {
                    const savedRecipes = res.map((re) => re.recipe_id)
                    const newHasSaved = []
                    favorites.forEach((re) => {
                        const hasSaved: HasSavedRecipe = {
                            favorite: savedRecipes.includes(re.recipes.id),
                            recipeID: re.recipes.id,
                        }
                        newHasSaved.push(hasSaved)
                    })
                    setHasSaved(newHasSaved)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [authUserID, favorites])

    return (
        <Grid.Container gap={isMobile ? 3 : 5} alignItems="center">
            {favorites && favorites.length > 0 ? (
                favorites.map((r, i) => {
                    return (
                        <Grid
                            key={i}
                            xs={12}
                            md={4}
                            justify="center"
                            alignItems="center"
                            alignContent="center"
                        >
                            <Card
                                variant={'flat'}
                                css={{
                                    w: '100%',
                                }}
                            >
                                <Card.Header>
                                    <Grid
                                        xs={12}
                                        md={12}
                                        css={{
                                            pr: '$5',
                                            pl: '$5',
                                            pt: '$0',
                                            pb: '$0',
                                        }}
                                        justify="space-between"
                                    >
                                        <Text h3={!isMobile} h4={isMobile}>
                                            {r.recipes.name}
                                        </Text>
                                        <FavoritesButton
                                            isMobile={isMobile}
                                            authUserID={authUserID}
                                            isDark={isDark}
                                            recipe={r.recipes}
                                            hasSaved={hasSaved}
                                            setHasSaved={setHasSaved}
                                            color={'#f31461'}
                                        />
                                    </Grid>
                                </Card.Header>
                                <Card.Body>
                                    <Grid
                                        xs={12}
                                        md={12}
                                        css={{
                                            pl: '$5',
                                            pr: '$5',
                                            pb: '$0',
                                            pt: '$0',
                                        }}
                                        justify="space-between"
                                    >
                                        <Text css={{ color: '$accents6' }}>
                                            @{r.recipes.creator_username}
                                        </Text>
                                        <Text
                                            onClick={() =>
                                                navigate({
                                                    pathname: `/recette/${r.recipes.id}`,
                                                })
                                            }
                                            css={{
                                                color: '$accents6',
                                                cursor: 'pointer',
                                                transition:
                                                    'all 0.2s ease-in-out',
                                                '&:hover': {
                                                    color: '$primary',
                                                },
                                            }}
                                        >
                                            Voir la recette
                                        </Text>
                                    </Grid>
                                </Card.Body>
                            </Card>
                        </Grid>
                    )
                })
            ) : (
                <DataNotFound />
            )}
        </Grid.Container>
    )
}

export default FavoritesList
