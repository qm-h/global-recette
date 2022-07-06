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
    uploadRecipeImage,
} from '../../../router/recipesRouter'
import { useEffect, useState } from 'react'

import { BiCloudUpload } from 'react-icons/bi'
import IngredientDropDown from './ingredients/IngredientDropDown'
import IngredientQuantity from './ingredients/IngredientQuantity'
import { getIngredientByName } from '../../../router/ingredientsRouter'
import { toasterErrorCommon } from '../../../utils/theme/toaster'
import { useAppContext } from '../../../utils/context/AppContext'

interface Props {
    setCreate: (value: boolean) => void
    ingredients: Ingredients[]
}

const UserCreateRecipeComponent = ({ setCreate, ingredients }: Props) => {
    const [name, setName] = useState<string>('')
    const [origin, setOrigin] = useState<string>('')
    const [note, setNote] = useState<string>('')
    const [image, setImage] = useState<File>()
    const [selectedIngredients, setSelectedIngredients] = useState<string>()
    const [waitingIngredients, setWaitingIngredients] = useState<string[]>([])
    const [waitingIngredientsQuantity, setWaitingIngredientsQuantity] =
        useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isDrag, setIsDrag] = useState<boolean>(false)

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
                image_path: image.name,
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

            const formData = new FormData()
            formData.append('image', image)

            await createRecipe(recipe)
            await uploadRecipeImage(formData)
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

    useEffect(() => {
        console.log(image)
    }, [image])

    return (
        <Card css={{ h: '85%', mt: '$28', w: '45%' }}>
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
                            onPress={() => setCreate(false)}
                        >
                            Annuler
                        </Button>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body>
                <Grid.Container gap={2} justify="center" alignItems="center">
                    <Grid
                        xs={12}
                        md={12}
                        justify="center"
                        css={{ w: '100%', m: '$5' }}
                    >
                        <Input
                            width="60%"
                            bordered={isDark ? true : false}
                            color={'primary'}
                            labelPlaceholder="Origine de la recette"
                            onChange={(e) => setOrigin(e.target.value)}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={12}
                        justify="center"
                        css={{ w: '100%', m: '$5' }}
                    >
                        <Input
                            width="60%"
                            color={'primary'}
                            bordered={isDark ? true : false}
                            labelPlaceholder="Nom de la recette"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        md={12}
                        justify="center"
                        css={{ w: '100%', m: '$5' }}
                    >
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
                    <Grid
                        xs={12}
                        md={12}
                        justify="center"
                        css={{ w: '100%', m: '$5' }}
                    >
                        <input
                            type="file"
                            name="file"
                            id="file"
                            hidden
                            className="inputfile"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <Button
                            color="success"
                            icon={<BiCloudUpload size="2em" />}
                            auto
                            ghost={!image ? true : false}
                            flat={image ? true : false}
                            css={{ ml: '$4' }}
                        >
                            <label className="labelInput" htmlFor="file">
                                {isDrag
                                    ? "Lacher l'image"
                                    : image && image.name
                                    ? `${image.name}`
                                    : 'Choisir une image'}
                            </label>
                        </Button>
                    </Grid>
                    <Grid xs={12} md={12} justify="center" css={{ w: '100%' }}>
                        <Textarea
                            color={'primary'}
                            bordered={isDark ? true : false}
                            width={'80%'}
                            minRows={5}
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
                            flat
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
