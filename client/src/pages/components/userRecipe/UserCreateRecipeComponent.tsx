import {
    Button,
    Card,
    Grid,
    Input,
    Loading,
    Row,
    Text,
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
    saveImageUUID,
    uploadRecipeImage,
} from '../../../router/recipesRouter'
import {
    getAllIngredients,
    getIngredientByName,
} from '../../../router/ingredientsRouter'
import { useEffect, useState } from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { BsFillCameraFill } from 'react-icons/bs'
import CreateIngredientModal from './ingredients/CreateIngredientModal'
import IngredientDropDown from './ingredients/IngredientDropDown'
import IngredientQuantity from './ingredients/IngredientQuantity'
import { toasterErrorCommon } from '../../../utils/theme/toaster'
import { useAppContext } from '../../../utils/context/AppContext'
import { v4 as uuidv4 } from 'uuid'
import { editorOptions } from '../../../utils/editorOptions'

interface Props {
    setCreate: (value: boolean) => void
}

const UserCreateRecipeComponent = ({ setCreate }: Props) => {
    const [name, setName] = useState<string>('')
    const [origin, setOrigin] = useState<string>('')
    const [note, setNote] = useState<string>('')
    const [image, setImage] = useState<File>()
    const [createIngredient, setCreateIngredient] = useState<boolean>(false)
    const [selectedIngredients, setSelectedIngredients] = useState<string>()
    const [waitingIngredients, setWaitingIngredients] = useState<string[]>(
        [] as string[]
    )
    const [waitingIngredientsQuantity, setWaitingIngredientsQuantity] =
        useState<string[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ingredients, setIngredients] = useState<Ingredients[]>(
        [] as Ingredients[]
    )
    const [ingredientCreated, setIngredientCreated] = useState<boolean>(false)
    const [editorHeight, setEditorHeight] = useState<number>(500)
    const [openEditor, setOpenEditor] = useState<boolean>(false)
    const { isDark } = useTheme()
    const { user } = useAppContext()

    const handleCreateRecipe = async () => {
        if (
            name !== '' &&
            origin !== '' &&
            note !== '' &&
            waitingIngredients.length &&
            waitingIngredientsQuantity.length
        ) {
            setIsLoading(true)
            const recipe: Recipe = {
                name: name,
                origin: origin,
                note: note,
                created_by: user.id,
                image_path: image ? image.name : '',
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
            if (image) {
                const image_uuid = uuidv4()
                const blob = image.slice(0, image.size, image.type)
                const newImage = new File(
                    [blob],
                    `${image_uuid}-${Date.now()}`,
                    {
                        type: image.type,
                    }
                )
                const formData = new FormData()
                formData.append('image', newImage)
                await saveImageUUID(newImage.name, image.name)
                await uploadRecipeImage(formData)
            }

            const createdRecipe = await getRecipeByName(recipe.name)
            await getIngredientByName(ingredients).then((res) => {
                res.map((ingredient, i) =>
                    recipeIngredient.push({
                        recipe_id: createdRecipe.id,
                        ingredient_id: ingredient.id,
                        quantity: waitingIngredientsQuantity[i].split('-')[1],
                    })
                )
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
        Promise.all([getAllIngredients()])
            .then(([ingredient]) => {
                setIngredients(ingredient)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [ingredientCreated])

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
                            size="sm"
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
                            aria-label="origine de la recette"
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
                            aria-label="nom de la recette"
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
                    <Grid md={5}>
                        <Text
                            color={'warning'}
                            css={{ p: '$0', m: '$0' }}
                            small
                        >
                            Vous ne trouvez pas votre ingrédient ?
                        </Text>
                    </Grid>
                    <Grid md={1}>
                        <Button
                            rounded
                            css={{ fontWeight: '$medium', fontSize: '12px' }}
                            size="sm"
                            color="success"
                            auto
                            flat
                            onPress={() =>
                                setCreateIngredient(!createIngredient)
                            }
                        >
                            Ajouter le
                        </Button>
                    </Grid>
                    {waitingIngredients &&
                        waitingIngredients.map((ingredient, i) => (
                            <Grid
                                key={i}
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
                        css={{ w: '100%', m: '$0' }}
                    >
                        <input
                            type="file"
                            name="file"
                            id="file"
                            hidden
                            aria-label="file"
                            className="inputfile"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <Button
                            color="success"
                            icon={<BsFillCameraFill size="2em" />}
                            auto
                            ghost={!image ? true : false}
                            flat={image ? true : false}
                            css={{ ml: '$4' }}
                        >
                            <label className="labelInput" htmlFor="file">
                                {image && image.name
                                    ? `${image.name}`
                                    : 'Une photo ?'}
                            </label>
                        </Button>
                    </Grid>
                    <Grid
                        xs={12}
                        md={12}
                        justify="center"
                        css={{ w: '100%', m: '$0', p: '$0', mb: '$5' }}
                    >
                        <Text color="warning" small>
                            Veuillez utiliser une image libre de droit d'auteur
                            si vous en avez une
                        </Text>
                    </Grid>
                    <Grid xs={12} md={12} justify="center" css={{ w: '100%' }}>
                        <Button
                            color={openEditor ? 'error' : 'success'}
                            auto
                            flat={isDark}
                            size={'sm'}
                            onPress={() => setOpenEditor(!openEditor)}
                        >
                            {!openEditor
                                ? 'Ecrire la recette en quelques mots'
                                : 'Fermer'}
                        </Button>
                    </Grid>
                    {openEditor && (
                        <Grid
                            xs={12}
                            md={12}
                            justify="center"
                            css={{ w: '100%' }}
                        >
                            <SunEditor
                                width="100%"
                                height={`${editorHeight}px`}
                                onResizeEditor={setEditorHeight}
                                placeholder={'Description de la recette'}
                                setContents={note}
                                onChange={(e) => setNote(e)}
                                lang={'fr'}
                                setOptions={editorOptions}
                            />
                        </Grid>
                    )}
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
                            flat={isDark}
                            onPress={handleCreateRecipe}
                            css={{ mb: '$5' }}
                        >
                            Créer ma recette
                        </Button>
                    )}
                </Row>
            </Card.Footer>
            <CreateIngredientModal
                isDark={isDark}
                ingredientCreated={ingredientCreated}
                isOpen={createIngredient}
                setIsOpen={setCreateIngredient}
                setIngredientCreated={setIngredientCreated}
            />
        </Card>
    )
}

export default UserCreateRecipeComponent
