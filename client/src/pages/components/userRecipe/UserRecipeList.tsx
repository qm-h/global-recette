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
                    lg={4}
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <Card
                        variant={'flat'}
                        css={{
                            w: '80%',
                            h: '300px',
                        }}
                    >
                        <Card.Header>
                            <Grid.Container gap={1} alignItems="center">
                                <Grid xs={6} md={7}>
                                    <Text h4 b>
                                        {recipe.name}
                                    </Text>
                                </Grid>
                                <Grid xs={6} md={5} justify="flex-end">
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
                            <Grid
                                xs={12}
                                md={12}
                                lg={12}
                                css={{
                                    p: '$10',
                                }}
                                justify="space-between"
                            >
                                <Tooltip
                                    placement="bottom"
                                    color={'success'}
                                    css={{
                                        width: 'fit-content',
                                    }}
                                    content={
                                        <RecipeIngredients recipe={recipe} />
                                    }
                                >
                                    <Text
                                        css={{
                                            color: '$accents6',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease-in-out',
                                            '&:hover': {
                                                color: '$primary',
                                            },
                                        }}
                                    >
                                        Voir les ingredients
                                    </Text>
                                </Tooltip>
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
                                {recipe.published ? (
                                    <Button
                                        light
                                        size="sm"
                                        color="error"
                                        disabled={isLoadingPublish}
                                        onPress={() =>
                                            handleUnpublishRecipes(recipe.id)
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
                        </Card.Footer>
                    </Card>
                </Grid>
                // <Card
                //     key={index}
                //     variant="bordered"
                //     css={{ w: isMobile ? '100%' : '25%' }}
                // >
                //     <Card.Header>
                //
                //     </Card.Header>
                //     <Card.Body>
                //         <Row
                //             justify="flex-start"
                //             css={{ mb: '$1', ml: '$2', w: 'auto' }}
                //         >
                //             <Text b>{recipe.origin}</Text>
                //         </Row>
                //         <Row justify="flex-start">
                //             <Collapse
                //                 css={{ fontSize: '10px', w: '90%' }}
                //                 bordered
                //                 animated
                //                 style={{
                //                     fontSize: '1em',
                //                 }}
                //                 title=""
                //                 subtitle="Description de la recette"
                //             >
                //                 {parse(recipe.note)}
                //             </Collapse>
                //         </Row>
                //     </Card.Body>
                //     <Card.Footer>
                //         <Grid.Container>
                //             <Grid xs={6} md={7}>
                //                 <Tooltip
                //                     placement="bottom"
                //                     color={'success'}
                //                     css={{
                //                         width: 'fit-content',
                //                     }}
                //                     content={
                //                         <RecipeIngredients recipe={recipe} />
                //                     }
                //                 >
                //                     <Text
                //                         css={{
                //                             color: '$accents5',
                //                             cursor: 'pointer',
                //                             transition: 'all 0.2s ease-in-out',
                //                             '&:hover': {
                //                                 color: '$primary',
                //                             },
                //                         }}
                //                     >
                //                         Voir les ingredients
                //                     </Text>
                //                 </Tooltip>
                //             </Grid>
                //         </Grid.Container>
                //     </Card.Footer>
                // </Card>
            ))}
        </>
    )
}

export default UserRecipeList
