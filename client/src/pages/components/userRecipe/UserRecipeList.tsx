import {
    Button,
    Card,
    Collapse,
    Grid,
    Loading,
    Modal,
    Popover,
    Row,
    Text,
    Tooltip,
    useTheme,
} from '@nextui-org/react'
import {
    deleteRecipe,
    publishRecipe,
    unpublishRecipe,
} from '../../../router/recipesRouter'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../../../utils/theme/toaster'

import DeleteRecipe from './DeleteRecipe'
import { FaTrashAlt } from 'react-icons/fa'
import { Recipe } from '../../../../../server/src/shared/types'
import RecipeIngredients from './ingredients/RecipeIngredients'
import SunEditor from 'suneditor-react'
import { isMobile } from 'react-device-detect'
import parse from 'html-react-parser'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import CardImageRecipe from '../recipe/CardImageRecipe'

interface Props {
    recipes: Recipe[]
    fetchRecipe: () => void
    isMobile: boolean
}

const UserRecipeList = ({ fetchRecipe, recipes, isMobile }: Props) => {
    const { isDark } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPublish, setIsLoadingPublish] = useState(false)

    const navigate = useNavigate()

    const handleDeleteRecipe = async (recipe: Recipe) => {
        setIsLoading(true)
        if (recipe.published) {
            await unpublishRecipe(recipe.id)
        }
        await deleteRecipe(recipe.id).then(async () => {
            toasterSuccessCommon(isDark, 'Recette supprimée avec succès')
            setIsLoading(false)
            fetchRecipe()
        })
    }

    const handlePublishRecipe = async (recipe: Recipe) => {
        if (recipe.image_path) {
            setIsLoadingPublish(true)
            await publishRecipe(recipe.id).then(async () => {
                toasterSuccessCommon(isDark, 'Recette publié avec succès')
                await fetchRecipe()
                setIsLoadingPublish(false)
            })
        } else {
            toasterErrorCommon(
                isDark,
                'Veuillez ajouter une image à votre recette, avant de pouvoir la publier'
            )
        }
    }

    const handleUnpublishRecipes = async (recipeID: number) => {
        setIsLoadingPublish(true)
        await unpublishRecipe(recipeID).then(async () => {
            toasterSuccessCommon(isDark, 'Recette dépublié avec succès')
            await fetchRecipe()
            setIsLoadingPublish(false)
        })
    }

    return (
        <>
            {recipes.map((recipe, i) => (
                <Grid
                    key={i}
                    xs={12}
                    md={6}
                    lg={6}
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <Card
                        variant={isMobile ? 'bordered' : 'flat'}
                        css={{
                            w: isMobile ? '100%' : '80%',
                            h: isMobile ? '400px' : '300px',
                        }}
                    >
                        <Card.Header>
                            <Grid.Container gap={1} alignItems="center">
                                <Grid xs={6} md={6} lg={6}>
                                    <Text h4 b>
                                        {recipe.name}
                                    </Text>
                                </Grid>
                                <Grid xs={6} md={6} lg={6} justify="flex-end">
                                    <Tooltip
                                        animated={false}
                                        trigger="click"
                                        content={
                                            <DeleteRecipe
                                                recipe={recipe}
                                                handleDeleteRecipe={
                                                    handleDeleteRecipe
                                                }
                                            />
                                        }
                                    >
                                        <Text
                                            css={{
                                                cursor: 'pointer',
                                            }}
                                            b
                                            color="error"
                                        >
                                            {isLoading ? (
                                                <Loading
                                                    type={'points-opacity'}
                                                    color={'white'}
                                                    size={'md'}
                                                />
                                            ) : (
                                                'Supprimer'
                                            )}
                                        </Text>
                                    </Tooltip>
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body css={{ p: '0' }}>
                            <CardImageRecipe
                                recipe={recipe}
                                width={70}
                                borderRadius={10}
                            />
                        </Card.Body>
                        <Card.Footer>
                            <Grid.Container
                                wrap="wrap"
                                css={{ p: isMobile ? '$10' : '$5' }}
                            >
                                <Grid
                                    xs={12}
                                    md={4}
                                    lg={4}
                                    justify={isMobile ? 'center' : 'flex-start'}
                                >
                                    <Tooltip
                                        placement="bottom"
                                        color={'success'}
                                        css={{
                                            width: 'fit-content',
                                        }}
                                        content={
                                            <RecipeIngredients
                                                recipe={recipe}
                                            />
                                        }
                                    >
                                        <Text
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
                                            Voir les ingredients
                                        </Text>
                                    </Tooltip>
                                </Grid>
                                <Grid
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    justify="center"
                                >
                                    <Text
                                        onClick={() =>
                                            navigate({
                                                pathname: `/recette/${recipe.id}`,
                                            })
                                        }
                                        css={{
                                            color: '$accents6',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                color: '$primary',
                                            },
                                        }}
                                    >
                                        Voir la recette
                                    </Text>
                                </Grid>
                                <Grid
                                    xs={12}
                                    sm={12}
                                    md={4}
                                    lg={4}
                                    justify={isMobile ? 'center' : 'flex-end'}
                                >
                                    {recipe.published ? (
                                        <Button
                                            light
                                            size="sm"
                                            color="error"
                                            disabled={isLoadingPublish}
                                            onPress={() =>
                                                handleUnpublishRecipes(
                                                    recipe.id
                                                )
                                            }
                                        >
                                            {isLoadingPublish ? (
                                                <Loading
                                                    color="currentColor"
                                                    size="sm"
                                                />
                                            ) : (
                                                'Dépublié la recette'
                                            )}
                                        </Button>
                                    ) : (
                                        <Button
                                            disabled={isLoadingPublish}
                                            light
                                            size="sm"
                                            css={{
                                                ml: '$0',
                                                mr: '$0',
                                                fontWeight: '$bold',
                                            }}
                                            color="success"
                                            onPress={() =>
                                                handlePublishRecipe(recipe)
                                            }
                                        >
                                            {isLoadingPublish ? (
                                                <Loading
                                                    color="currentColor"
                                                    size="sm"
                                                />
                                            ) : (
                                                'Publié la recette'
                                            )}
                                        </Button>
                                    )}
                                </Grid>
                            </Grid.Container>
                        </Card.Footer>
                    </Card>
                </Grid>
            ))}
        </>
    )
}

export default UserRecipeList
