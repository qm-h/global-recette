import { useEffect, useState } from 'react'
import { Ingredients, Recipes } from '../../../server/share/types'
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
        console.log('counter:', counter)
        console.log('addRecipesIngredients:', addRecipesIngredients)
        console.log('ErrorEmptyField:', errorEmptyField)
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
                    recipeId: 1,
                    name: ingredientsName,
                },
            ]
            const data: Recipes = {
                id: 1,
                name: name,
                details: details,
                ingredients: ingredients,
                origin: origin,
            }
            recipesData.push(data)
            setRecipesData([])
            setAddRecipes(false)
            setAddRecipesIngredients(false)
            setCounter(0)
            addRecipe(data)
        } else {
            setErrorEmptyField('Les champs ne doivent pas être vides')
        }
    }

    useEffect(() => {
        getAllRecipes.then((r) => setRecipesData(r))
        getRecipesIngredients.then((res) => setRecipesIngredientsData(res))
    }, [recipesData, recipesIngredientsData])

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
                        {recipesData
                            ? recipesData.map((recipe, index) => (
                                  <>
                                      <li key={index}>
                                          <span>Nom : {recipe.name} </span>
                                          <br />
                                          <span>Origine : {recipe.origin}</span>
                                          <br />
                                          <span>
                                              Ingredient :
                                              {recipe.ingredients.map(
                                                  (ingredient) => (
                                                      <li>{ingredient.name}</li>
                                                  )
                                              )}
                                          </span>
                                          <br />
                                          <span>
                                              Details : {recipe.details}
                                          </span>
                                          <button className="button edit_button">
                                              Edit
                                          </button>
                                          <button className="button delete_button">
                                              Delete
                                          </button>
                                      </li>
                                  </>
                              ))
                            : 'Loading...'}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ListRecipes
