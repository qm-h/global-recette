import {
    FullRecette,
    Ingredients,
    Recipe,
} from '../../../../server/shared/types'
import { Link, useParams } from 'react-router-dom'
import {
    addRecipeIngredients,
    deleteRecipeIngredient,
    getAllIngredients,
    getRecipesById,
    getRecipesIngredients,
    updateRecipe,
} from '../../api/router'
import { useEffect, useState } from 'react'

const RecipeDetails = () => {
    const [recipeData, setRecipeData] = useState<Recipe>()
    const [isEditable, setIsEditable] = useState(false)
    const [ingredientsData, setIngredientsData] = useState<Ingredients[]>([])
    const [allIngredients, setAllIngredients] = useState<Ingredients[]>([])
    const [ingredientID, setIngredientID] = useState<number>()
    const [addIngredientAction, setAddIngredientAction] =
        useState<boolean>(false)
    const [removeIngredientAction, setRemoveIngredientAction] =
        useState<boolean>(false)
    const [newRecipeName, setNewRecipeName] = useState<string>('')
    const [newDescription, setNewDescription] = useState<string>('')

    const { id } = useParams()

    const handleChange = (event) => setIngredientID(event.target.value)

    const handleAddIngredient = (idIngredient: number, idRecipe: number) => {
        console.log(idIngredient, idRecipe)

        if (idIngredient && idRecipe) {
            const data: FullRecette = {
                idRecette: idRecipe,
                idIngredient: idIngredient,
            }
            addRecipeIngredients(data)
            setAddIngredientAction(true)
        }
    }

    const removeRecipeIngredient = (id: number) => {
        if (id) {
            deleteRecipeIngredient(id)
            setRemoveIngredientAction(true)
        } else {
            console.log('error')
        }
    }

    useEffect(() => {
        Promise.all([
            getRecipesById(id),
            getRecipesIngredients(id),
            getAllIngredients(),
        ]).then(([recipe, ingredients, allIngredients]) => {
            setRecipeData(recipe)
            setIngredientsData(ingredients)
            setAllIngredients(allIngredients)
            setNewRecipeName(recipe.nomRecette)
            setNewDescription(recipe.description)
        })

        setRemoveIngredientAction(false)
        setAddIngredientAction(false)
        
    }, [id, addIngredientAction, removeIngredientAction, isEditable])

    const recipeDetail = (recipe: Recipe) => (
        <>
            <p className="recipe__content--name">{recipe.nomRecette}</p>
            <p className="recipe__content--origin"><strong>Origine :</strong> {recipe.origine}</p>
            <p className="recipe__content--description">{recipe.description}</p>
        </>
    )

    const recipeDetailEditable = (recipe: Recipe) => (
        <>
            <h3>Edition :</h3>
            <input
                type="text"
                name="nomRecette"
                onChange={(e) => setNewRecipeName(e.target.value)}
                value={newRecipeName}
            />
            <input
                type="text"
                name="description"
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
            />
            <button
                onClick={() =>
                    handleUpdateRecipe({
                        idRecette: recipe.idRecette,
                        nomRecette: newRecipeName,
                        origine: recipe.origine,
                        description: newDescription,
                    })
                }
            >
                Sauvegarder
            </button>
        </>
    )

    const handleUpdateRecipe = (data: Recipe) => {
        updateRecipe(data)
        setIsEditable(false)
    }

    const handleEditAction = (state: boolean) => setIsEditable(state)

    return (
        <div className="card__recipe">
            <div className="container__back">
                <Link to={'/'} className="content__back">Retour</Link>
            </div>
            <h1 className="">Details</h1>
            {!isEditable ? (
                <button onClick={() => handleEditAction(true)}>
                    Editer cette recette
                </button>
            ) : (
                <button onClick={() => handleEditAction(false)}>
                    Arrêter l'Edition
                </button>
            )}
            <div className="recipe__content">
                <p className="recipe__content__title">Voulez vous ajouter un ingrédient ?</p>
                <select onChange={handleChange} value={ingredientID}>
                    <option
                        selected
                        disabled
                        value="Selectionner un ingrédient"
                    >
                        Selectionner un ingrédient
                    </option>
                    {allIngredients.filter(el => {
                        return !ingredientsData.find(el2 => el2.idIngredient === el.idIngredient)
                    }).map((ingredient) => (
                        <option
                            key={ingredient.idIngredient}
                            value={ingredient.idIngredient}
                        >
                            {ingredient.nomIngredient}
                        </option>
                    ))}
                </select>
                <button
                    className="button__add"
                    onClick={() =>
                        handleAddIngredient(ingredientID, recipeData.idRecette)
                    }
                >
                    Ajouter
                </button>
            </div>
            {!isEditable ? (
                <div>{recipeData ? recipeDetail(recipeData) : 'aucun'}</div>
            ) : (
                recipeDetailEditable(recipeData)
            )}

            <div>
                <h3 className="recipe__content--h3">Ingredients :</h3>
                {ingredientsData
                    ? ingredientsData.map((ing, index) => (
                          <div className="container__deleteelement">
                              <p key={index}>{ing.nomIngredient}</p>
                              <button
                                  className="button__delete"
                                  key={ing.nomIngredient}
                                  onClick={() =>
                                      removeRecipeIngredient(ing.idIngredient)
                                  }
                              >
                                  Supprimer cet ingredient
                              </button>
                          </div>
                      ))
                    : 'aucun'}
            </div>
        </div>
    )
}

export default RecipeDetails
