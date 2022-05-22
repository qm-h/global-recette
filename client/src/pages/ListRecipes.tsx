import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Recipe } from '../../../server/shared/types'
import { addRecipe, getAllRecipes } from '../api/router'
import AddRecipeComponent from './components/addRecipeComponent'
import AddRecipeButton from './components/AddRecipesButton'

const ListRecipes = () => {
    const [addRecipes, setAddRecipes] = useState(false)
    const [recipesData, setRecipesData] = useState<Recipe[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(0)
    const [errorEmptyField, setErrorEmptyField] = useState('')

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

    const handleSave = (
        name: string,
        ingredientsName: string,
        origine: string,
        details: string
    ) => {
        if (
            name !== '' &&
            ingredientsName !== '' &&
            origine !== '' &&
            details !== ''
        ) {
            const data: Recipe = {
                idRecette: 1,
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

    useEffect(() => {
        ;(async () => {
            const promiseResult = await Promise.all([getAllRecipes()])
            setRecipesData(promiseResult[0])
            setIsLoading(false)
        })()
    }, [])

    console.log(recipesData)
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
                                  <li
                                      key={i}
                                      className="card_recipe"
                                      onClick={() => handleOnClick(r.idRecette)}
                                  >
                                      <span>Nom : {r.nomRecette} </span>
                                      <br />
                                      <span>Origine : {r.origine}</span>
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
