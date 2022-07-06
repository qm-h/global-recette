import {
    Button,
    Card,
    Grid,
    Input,
    Loading,
    Row,
    Text,
    Textarea,
    useTheme,
} from '@nextui-org/react'
import {
    Ingredients,
    Recipe,
    RecipeIngredient,
} from '../../../../../server/src/shared/types'
import {
    createRecipe,
    getRecipeByName,
    insertRecipeIngredients,
} from '../../../router/recipesRouter'

import IngredientDropDown from './ingredients/IngredientDropDown'
import IngredientQuantity from './ingredients/IngredientQuantity'
import { getIngredientByName } from '../../../router/ingredientsRouter'
import { toasterErrorCommon } from '../../../utils/theme/toaster'
import { useAppContext } from '../../../utils/context/AppContext'
import { useState } from 'react'

interface Props {
    setCreate: (value: boolean) => void
    ingredients: Ingredients[]
}

const UserCreateRecipeComponent = ({ setCreate, ingredients }: Props) => {
    const [name, setName] = useState<string>('')
    const [origin, setOrigin] = useState<string>('')
    const [note, setNote] = useState<string>('')
    const [selectedIngredients, setSelectedIngredients] = useState<string>()
    const [waitingIngredients, setWaitingIngredients] = useState<string[]>([])
    const [waitingIngredientsQuantity, setWaitingIngredientsQuantity] =
        useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { isDark } = useTheme()
    const { user } = useAppContext()

    const handleCreateRecipe = async () => {
        setIsLoading(true)
        if (
            name !== '' &&
            origin !== '' &&
            note !== '' &&
            waitingIngredients.length &&
            waitingIngredientsQuantity.length
        ) {
            const recipe: Recipe = {
                name: name,
                origin: origin,
                note: note,
                created_by: user.id,
                created_at: Date.now(),
                creator_username: user.username,
            }

            const ingredients: Ingredients[] = []
            const recipeIngredient: RecipeIngredient[] = []
            for (let i = 0; i < waitingIngredients.length; i++) {
                ingredients.push({
                    name: waitingIngredients[i],
                })
            }
            await createRecipe(recipe)
            const createdRecipe = await getRecipeByName(recipe.name)
            await getIngredientByName(ingredients).then((res) => {
                res.map((ingredient, i) => {
                    recipeIngredient.push({
                        recipe_id: createdRecipe.id,
                        ingredient_id: ingredient.id,
                        quantity: waitingIngredientsQuantity[i].split('-')[1],
                    })
                })
            })
            recipeIngredient.map(async (ingredient) => {
                await insertRecipeIngredients(ingredient).then(() => {
                    setIsLoading(false)
                    setCreate(false)
                })
            })
        } else {
            toasterErrorCommon(isDark, 'Veuillez remplir tous les champs')
        }
    }

    const handleDeleteIngredient = (ingredient: string) => {
        setWaitingIngredients(
            waitingIngredients.filter(
                (ingredientName) => ingredientName !== ingredient
            )
        )
    }

    const handleAddQuantityIngredient = (
        ingredient: string,
        quantity: string
    ) => {
        const findIngredient = waitingIngredients.find(
            (ingredientName) => ingredientName === ingredient
        )
        if (findIngredient) {
            setWaitingIngredientsQuantity(
                waitingIngredients.map((ingredientName) =>
                    ingredientName === findIngredient
                        ? `${findIngredient}-${quantity}`
                        : `${
                              waitingIngredientsQuantity[
                                  waitingIngredients.indexOf(ingredientName)
                              ]
                          }`
                )
            )
        } else {
            setWaitingIngredientsQuantity([
                ...waitingIngredientsQuantity,
                `${ingredient}-${quantity}`,
            ])
        }
    }

    const handleAddIngredient = (ingredient: string) => {
        if (ingredient === '') {
            toasterErrorCommon(isDark, 'Aucun ingrédient sélectionné')
        } else {
            if (
                waitingIngredients.find(
                    (ingredientName) => ingredientName === ingredient
                )
            ) {
                toasterErrorCommon(
                    isDark,
                    'Cet ingrédient est déjà dans la liste'
                )
            } else {
                setWaitingIngredients([...waitingIngredients, ingredient])
            }
        }
    }

    return (
        <Card css={{ h: '85%', mt: '$28', w: '35%' }}>
            <Card.Header>
                <Grid.Container gap={2} alignItems="center">
                    <Grid xs={6} md={11}>
                        <Text h2 b>
                            Créer ma recette 🥗
                        </Text>
                    </Grid>
                    <Grid xs={6} md={1} justify="flex-end">
                        <Button
                            color="error"
                            auto
                            ghost
                            onPress={() => setCreate(false)}
                        >
                            Annuler
                        </Button>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body>
                <Grid.Container gap={2} justify="center" alignItems="center">
                    <Grid xs={12} md={12} justify="center" css={{ w: '100%' }}>
                        <Input
                            width="60%"
                            label="Origine"
                            bordered={isDark ? true : false}
                            color={'primary'}
                            helperText="Required"
                            placeholder="Origine de la recette"
                            onChange={(e) => setOrigin(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={12} md={12} justify="center" css={{ w: '100%' }}>
                        <Input
                            width="60%"
                            color={'primary'}
                            label="Nom"
                            bordered={isDark ? true : false}
                            helperText="Required"
                            placeholder="Nom de la recette"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={12} md={12} justify="center" css={{ w: '100%' }}>
                        <IngredientDropDown
                            setSelectedIngredients={setSelectedIngredients}
                            ingredientsList={ingredients}
                        />
                        <Button
                            onPress={() =>
                                handleAddIngredient(selectedIngredients)
                            }
                            flat
                            css={{ ml: '$4' }}
                            color={'success'}
                            auto
                        >
                            Ajouter
                        </Button>
                    </Grid>
                    {waitingIngredients &&
                        waitingIngredients.map((ingredient) => (
                            <Grid
                                xs={12}
                                md={12}
                                justify="center"
                                css={{ w: '100%' }}
                            >
                                <IngredientQuantity
                                    isDark={isDark}
                                    ingredient={ingredient}
                                    handleDeleteIngredient={
                                        handleDeleteIngredient
                                    }
                                    handleAddQuantityIngredient={
                                        handleAddQuantityIngredient
                                    }
                                />
                            </Grid>
                        ))}
                    <Grid xs={12} md={12} justify="center" css={{ w: '100%' }}>
                        <Textarea
                            label="Note"
                            color={'primary'}
                            bordered={isDark ? true : false}
                            width={'60%'}
                            helperText="Vous avez des notes ? Elles seront affichées sur votre recette"
                            placeholder="Ecrivez vos notes ici"
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </Grid>
                </Grid.Container>
            </Card.Body>
            <Card.Footer>
                <Row justify="center">
                    {isLoading ? (
                        <Button auto disabled rounded css={{ mb: '$5' }}>
                            <Loading color="currentColor" size="md" />
                        </Button>
                    ) : (
                        <Button
                            color="success"
                            auto
                            rounded
                            ghost
                            onPress={handleCreateRecipe}
                            css={{ mb: '$5' }}
                        >
                            Créer ma recette
                        </Button>
                    )}
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default UserCreateRecipeComponent
