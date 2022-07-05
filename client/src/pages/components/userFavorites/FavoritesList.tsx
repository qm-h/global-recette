import { Card, Grid, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import FavoritesButton from '../common/commonComponents/FavoritesButton'
import ModalRecipeDetail from '../allRecipe/ModalRecipeDetail'
import { getSavedRecipes } from '../../../router/userRouter'

interface FavoritesListProps {
    favorites: any[]
    isDark: boolean
    authUserID: number
}

const FavoritesList = ({
    authUserID,
    favorites,
    isDark,
}: FavoritesListProps) => {
    const [hasSaved, setHasSaved] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [onClose, setOnClose] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        Promise.all([getSavedRecipes(authUserID)])
            .then(([res]) => {
                res.forEach((recipe) => {
                    if (recipe.recipe_id === favorites[0].recipes.id) {
                        setHasSaved(true)
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [authUserID, favorites])

    return (
        <Grid.Container gap={5} alignItems="center">
            {favorites.map((r, i) => (
                <Grid
                    key={i}
                    md={4}
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <Card>
                        <Card.Header>
                            <Grid
                                md={12}
                                css={{ p: '$2' }}
                                justify="space-between"
                            >
                                <Text h3>{r.recipes.name}</Text>
                                <FavoritesButton
                                    authUserID={authUserID}
                                    isDark={isDark}
                                    recipe={r.recipes}
                                    hasSaved={hasSaved}
                                    setHasSaved={setHasSaved}
                                />
                            </Grid>
                        </Card.Header>
                        <Card.Body>
                            <Grid
                                md={12}
                                css={{ p: '$2' }}
                                justify="space-between"
                            >
                                <Text css={{ color: '$accents5' }}>
                                    @Createur
                                </Text>
                                <Text
                                    onClick={() => handleOpen}
                                    color="primary"
                                >
                                    Voir la recette
                                </Text>
                            </Grid>
                        </Card.Body>
                    </Card>
                    <ModalRecipeDetail
                        isOpen={isOpen}
                        onClose={handleClose}
                        recipe={r.recipes}
                    />
                </Grid>
            ))}
        </Grid.Container>
    )
}

export default FavoritesList
