import { addRecipe, deleteRecipe, getAllRecipes } from '../api/router'
import { useCallback, useEffect, useState } from 'react'

import AddRecipeButton from './components/AddRecipesButton'
import AddRecipeComponent from './components/addRecipeComponent'
import { Recipe } from '../../../server/shared/types'
import { useNavigate } from 'react-router-dom'

const ListRecipes = () => {
    const [addRecipes, setAddRecipes] = useState(false)
    const [recipesData, setRecipesData] = useState<Recipe[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(0)
    const [errorEmptyField, setErrorEmptyField] = useState('')
    const [removeRecipe, setRemoveRecipe] = useState(false)
    const [removeRecipeAction, setRemoveRecipeAction] = useState(false)
    const [recipeRemoveId, setRecipeRemoveId] = useState('')

    const navigate = useNavigate()
    const handleOnClick = useCallback(
        (id) => navigate(`/detail/${id}`, { replace: true }),
        [navigate]
    )

    const handleAdd = () => {
        setAddRecipes(true)
    }
    const handleAddIngredient = () => {
        setCounter(counter + 1)
    }
    const handleClose = () => {
        setAddRecipes(false)
        setCounter(0)
        setErrorEmptyField('')
    }

    const handleSave = (name: string, origine: string, details: string) => {
        if (name !== '' && origine !== '' && details !== '') {
            const data: Recipe = {
                idRecette: 0,
                nomRecette: name,
                description: details,
                origine: origine,
            }
            setAddRecipes(false)
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
    }, [])

    const handleRemoveRecipe = (id: number) => {
        console.log(id)
        deleteRecipe(id)
        setRemoveRecipeAction(true)
        setRemoveRecipe(false)
    }

    useEffect(() => {
        ;(async () => {
            const promiseResult = await Promise.all([getAllRecipes()])
            setRecipesData(promiseResult[0])
            setIsLoading(false)
        })()
    }, [removeRecipeAction])

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
                        {removeRecipe && (
                            <>
                                <input
                                    type="text"
                                    name="recipeID"
                                    onChange={(event) =>
                                        setRecipeRemoveId(event.target.value)
                                    }
                                />
                                <button
                                    onClick={() =>
                                        handleRemoveRecipe(
                                            parseInt(recipeRemoveId)
                                        )
                                    }
                                >
                                    Remove
                                </button>
                            </>
                        )}

                        {isLoading
                            ? 'loading'
                            : recipesData.map((r, i) => (
                                  <>
                                      <li
                                          key={i}
                                          className="card_recipe"
                                          onClick={() =>
                                              handleOnClick(r.idRecette)
                                          }
                                      >
                                          <span>id: {r.idRecette}</span>
                                          <span>Nom: {r.nomRecette} </span>
                                          <br />
                                          <span>Origine: {r.origine}</span>
                                          <br />
                                          <span>Details: {r.description}</span>
                                      </li>
                                      <button className="edit_button">
                                          Edit this recipe
                                      </button>
                                      <button
                                          onClick={() => setRemoveRecipe(true)}
                                          className="delete_button"
                                      >
                                          Remove this recipe
                                      </button>
                                  </>
                              ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ListRecipes
