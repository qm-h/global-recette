import {
    Button,
    Card,
    Collapse,
    Grid,
    Loading,
    Popover,
    Row,
    Text,
    useTheme,
} from '@nextui-org/react'
import {
    deleteRecipe,
    publishRecipe,
    unpublishRecipe,
} from '../../../router/recipesRouter'

import { FaTrashAlt } from 'react-icons/fa'
import { Recipe } from '../../../../../server/src/shared/types'
import RecipeIngredients from './ingredients/RecipeIngredients'
import { toasterSuccessCommon } from '../../../utils/theme/toaster'
import { useState } from 'react'

interface Props {
    recipes: Recipe[]
    fetchRecipe: () => void
}

const UserRecipeList = ({ fetchRecipe, recipes }: Props) => {
    const { isDark } = useTheme()
    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteRecipe = async (recipeID: number) => {
        setIsLoading(true)
        await deleteRecipe(recipeID).then(() => {
            toasterSuccessCommon(isDark, 'Recette supprimée')
            setIsLoading(false)
            fetchRecipe()
        })
    }

    const handlePublishRecipe = async (recipeID: number) =>
        await publishRecipe(recipeID).then(() => {
            toasterSuccessCommon(isDark, 'Recette publié avec succès')
            fetchRecipe()
        })

    const handleUnpublishRecipes = async (recipeID: number) =>
        await unpublishRecipe(recipeID).then(() => {
            toasterSuccessCommon(isDark, 'Recette dépublié avec succès')
            fetchRecipe()
        })

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
                                    icon={
                                        isLoading ? (
                                            <Loading
                                                color="currentColor"
                                                size="md"
                                            />
                                        ) : (
                                            <FaTrashAlt size={'1em'} />
                                        )
                                    }
                                    auto
                                    ghost
                                    disabled={isLoading}
                                    rounded
                                    onPress={() =>
                                        handleDeleteRecipe(recipe.id)
                                    }
                                    color="error"
                                    css={{ ml: '$5' }}
                                />
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
                                <Popover isBordered={isDark ? true : false}>
                                    <Popover.Trigger>
                                        <Text color="primary">
                                            Voir les ingredients
                                        </Text>
                                    </Popover.Trigger>
                                    <Popover.Content>
                                        <RecipeIngredients recipe={recipe} />
                                    </Popover.Content>
                                </Popover>
                            </Grid>
                            <Grid xs={6} md={5} justify="flex-end">
                                {recipe.published ? (
                                    <Button
                                        auto
                                        flat
                                        color="error"
                                        onPress={() =>
                                            handleUnpublishRecipes(recipe.id)
                                        }
                                    >
                                        Dépublier la recette
                                    </Button>
                                ) : (
                                    <Button
                                        auto
                                        flat
                                        color="success"
                                        onPress={() =>
                                            handlePublishRecipe(recipe.id)
                                        }
                                    >
                                        Publié la recette
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
