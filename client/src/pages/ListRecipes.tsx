import { useCallback, useEffect, useState } from 'react'
import { Ingredients, Recipes } from '../../../server/shared/types'
import { addRecipe, getAllRecipes, getRecipesIngredients } from '../api/router'
import AddRecipeComponent from './components/addRecipeComponent'
import AddRecipeButton from './components/AddRecipesButton'

const ListRecipes = () => {
    const [addRecipes, setAddRecipes] = useState(false)
    const [addRecipesIngredients, setAddRecipesIngredients] = useState(false)
    const [recipesData, setRecipesData] = useState<Recipes[]>([])
    const [recipesIngredientsData, setRecipesIngredientsData] = useState<
        Ingredients[]
    >([])
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(0)
    const [errorEmptyField, setErrorEmptyField] = useState('')

    const handleAdd = () => {
        setAddRecipes(true)
    }
    const handleAddIngredient = () => {
        setCounter(counter + 1)
        setAddRecipesIngredients(true)
    }
    const handleClose = () => {
        setAddRecipes(false)
        setAddRecipesIngredients(false)
        setCounter(0)
        setErrorEmptyField('')
    }

    const handleSave = (
        name: string,
        ingredientsName: string,
        origin: string,
        details: string
    ) => {
        if (
            name !== '' &&
            ingredientsName !== '' &&
            origin !== '' &&
            details !== ''
        ) {
            const ingredients: Ingredients[] = [
                {
                    id: 1,
                    nomIngredient: ingredientsName,
                },
            ]
            const data: Recipes = {
                id: 1,
                nomRecette: name,
                description: details,
                ingredients: ingredients,
                origin: origin,
            }
            setAddRecipes(false)
            setAddRecipesIngredients(false)
            setCounter(0)
            addRecipe(data)
            fetchRecipes()
        } else {
            setErrorEmptyField('Les champs ne doivent pas être vides')
        }
    }

    const fetchRecipes = useCallback(async () => {
        const recipes = await getAllRecipes()
        setRecipesData(recipes)
    }, [getAllRecipes])

    useEffect(() => {
        Promise.all([getAllRecipes(), getRecipesIngredients(1)]).then(
            ([recipes, ingredients]) => {
                setRecipesData(recipes)
                setRecipesIngredientsData(ingredients)
                setIsLoading(false)
            }
        )
    }, [])

    return (
        <>
            <div className="card_container">
                <div className="title_card">
                    <h1>Recettes</h1>
                </div>
                <div className="card">
                    <AddRecipeButton
                        addRecipes={addRecipes}
                        handleClose={handleClose}
                        handleAddIngredient={handleAddIngredient}
                        handleAdd={handleAdd}
                    />
                    <ul>
                        {addRecipes && (
                            <AddRecipeComponent
                                errorMessage={errorEmptyField}
                                counter={counter}
                                handleSave={handleSave}
                            />
                        )}
                        {isLoading
                            ? 'loading'
                            : recipesData.map((r, i) => (
                                  <li key={i}>
                                      <span>Nom : {r.nomRecette} </span>
                                      <br />
                                      <span>Origine : {r.origin}</span>
                                      <br />
                                      <span>
                                          Ingredient :
                                          {r.ingredients.map((ingredient) => (
                                              <li>
                                                  {ingredient.nomIngredient}
                                              </li>
                                          ))}
                                      </span>
                                      <br />
                                      <span>Details : {r.description}</span>
                                      <button className="button edit_button">
                                          Edit
                                      </button>
                                      <button className="button delete_button">
                                          Delete
                                      </button>
                                  </li>
                              ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ListRecipes
