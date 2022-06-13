import { addRecipe, deleteRecipe, getAllRecipes } from '../api/router'
import { useCallback, useEffect, useState } from 'react'

import AddRecipeButton from './components/AddRecipesButton'
import AddRecipeComponent from './components/addRecipeComponent'
import { Recipe } from '../../../server/shared/types'
import { SpinnerCircular } from 'spinners-react'
import { useNavigate } from 'react-router-dom'

const ListRecipes = () => {
    const [addRecipes, setAddRecipes] = useState(false)
    const [recipesData, setRecipesData] = useState<Recipe[]>([])
    const [recipeList, setRecipeList] = useState<Recipe[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [counter, setCounter] = useState(0)
    const [errorEmptyField, setErrorEmptyField] = useState('')
    const [removeRecipe, setRemoveRecipe] = useState(false)
    const [removeRecipeAction, setRemoveRecipeAction] = useState(false)
    const [recipeRemoveId, setRecipeRemoveId] = useState('')
    const [searchRecipe, setSearchRecipe] = useState('')

    const navigate = useNavigate()
    const handleOnClick = useCallback(
        (id) => navigate(`/detail/${id}`, { replace: true }),
        [navigate]
    )

    const handleAdd = () => {
        setAddRecipes(true)
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
        deleteRecipe(id)
        setRemoveRecipeAction(true)
        setRemoveRecipe(false)
    }

    const handleSearchRecipe = (e) => {
        setSearchRecipe(e.target.value)
        setRecipeList(recipesData)
    }

    const handleclick = () => {
        if (searchRecipe !== '') {
            let newList = recipesData.filter((re) =>
                re.nomRecette
                    .toLowerCase()
                    .startsWith(searchRecipe.toLowerCase())
            )
            setRecipeList(newList)
        }
        setSearchRecipe('')
    }

    useEffect(() => {
        ;(async () => {
            const promiseResult = await Promise.all([getAllRecipes()])
            setRecipesData(promiseResult[0])
            setIsLoading(false)
        })()
    }, [removeRecipeAction])

    useEffect(() => {
        setRecipeList(recipesData)
    }, [recipesData])

    return (
        <>
            {' '}
            {isLoading ? (
                <SpinnerCircular />
            ) : (
                <>
                    <div className="card_container">
                        <div className="card">
                            <div className="title_card">
                                <h1>Recettes</h1>
                            </div>
                            <input
                                onFocus={handleSearchRecipe}
                                onChange={handleSearchRecipe}
                            />
                            <button onClick={handleclick}>Chercher</button>
                            <AddRecipeButton
                                addRecipes={addRecipes}
                                handleClose={handleClose}
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
                                                setRecipeRemoveId(
                                                    event.target.value
                                                )
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

                                {recipeList.map((r, i) => (
                                    <div className="container__card_recipe">
                                        <li
                                            
                                            key={i}
                                            className="card_recipe"
                                            onClick={() =>
                                                handleOnClick(r.idRecette)
                                            }
                                        >
                                            <div className="container__idName">
                                                <span>Numéro {r.idRecette} : {r.nomRecette}</span>
                                            </div>
                                            <br />
                                            <span className="recipe__origin">Origine: {r.origine}</span>
                                            <br />
                                            <span className="recipe__desc">{r.description}</span>
                                      </li>
                                        <button
                                            onClick={() =>
                                                setRemoveRecipe(true)
                                            }
                                            className="delete_button"
                                        >
                                            Remove this recipe
                                        </button>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ListRecipes
