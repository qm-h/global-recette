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
import { useState } from 'react'

interface Props {
    recipes: Recipe[]
    fetchRecipe: () => void
}

const UserRecipeList = ({ fetchRecipe, recipes }: Props) => {
    const { isDark } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingPublish, setIsLoadingPublish] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const handleDeleteRecipe = async (recipe: Recipe) => {
        setOpenDeleteModal(false)
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
            {recipes.map((recipe, index) => (
                <Card key={index} variant="bordered" css={{ w: '25%' }}>
                    <Card.Header>
                        <Grid.Container gap={1} alignItems="center">
                            <Grid xs={6} md={7}>
                                <Text h4 b>
                                    {recipe.name}
                                </Text>
                            </Grid>
                            <Grid xs={6} md={5} justify="flex-end">
                                <Button
                                    auto
                                    icon={
                                        isLoading ? (
                                            <Loading
                                                color="currentColor"
                                                size="md"
                                            />
                                        ) : (
                                            <FaTrashAlt size={15} />
                                        )
                                    }
                                    disabled={isLoading}
                                    light={isDark}
                                    size={'sm'}
                                    color="error"
                                    onPress={() => setOpenDeleteModal(true)}
                                >
                                    Supprimer
                                </Button>
                                <Modal
                                    blur
                                    closeButton
                                    open={openDeleteModal}
                                    onClose={() => setOpenDeleteModal(false)}
                                >
                                    <Modal.Body>
                                        <DeleteRecipe
                                            recipe={recipe}
                                            handleDeleteRecipe={
                                                handleDeleteRecipe
                                            }
                                        />
                                    </Modal.Body>
                                </Modal>
                            </Grid>
                        </Grid.Container>
                    </Card.Header>
                    <Card.Body>
                        <Row
                            justify="flex-start"
                            css={{ mb: '$1', ml: '$2', w: 'auto' }}
                        >
                            <Text b color="#9F9F9F">
                                {recipe.origin}
                            </Text>
                        </Row>
                        <Row justify="flex-start">
                            <Collapse
                                css={{ fontSize: '10px', w: '90%' }}
                                bordered
                                animated
                                title="Note"
                                subtitle="concernant la recette"
                            >
                                <Text>{recipe.note}</Text>
                            </Collapse>
                        </Row>
                    </Card.Body>
                    <Card.Footer>
                        <Grid.Container>
                            <Grid xs={6} md={7}>
                                <Tooltip
                                    placement="bottom"
                                    content={
                                        <RecipeIngredients recipe={recipe} />
                                    }
                                >
                                    <Text
                                        css={{
                                            color: '$accents5',
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
                            </Grid>
                            <Grid xs={6} md={5} justify="flex-end">
                                {recipe.published ? (
                                    <Button
                                        auto
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
                                            'Dépublié'
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        auto
                                        flat
                                        disabled={isLoadingPublish}
                                        size="sm"
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
                                            'Publié'
                                        )}
                                    </Button>
                                )}
                            </Grid>
                        </Grid.Container>
                    </Card.Footer>
                </Card>
            ))}
        </>
    )
}

export default UserRecipeList
