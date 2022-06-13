import { addRecipe, deleteRecipe, getAllRecipes } from '../api/router'
import { SetStateAction, useCallback, useEffect, useState } from 'react'

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

    const handleSearchRecipe = (event) => {
        let value = event.target.value;
        let newList = recipesData.filter((re) => re.nomRecette.toLowerCase().startsWith(value.toLowerCase()))
        setRecipeList(newList)
    }

    useEffect(() => {
        (async () => {
            const promiseResult = await Promise.all([getAllRecipes()])
            setRecipesData(promiseResult[0])
            setIsLoading(false)
            setRemoveRecipe(false)
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
                            <div className="container__search">
                                <input
                                    // onFocus={handleSearchRecipe}
                                    onChange={handleSearchRecipe}
                                    placeholder="Produit recherché "
                                />
                                {/* <button className="button__search" onClick={handleclick}>Chercher</button> */}
                            </div>
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
                                    <div className="container_remove_button">
                                        <input
                                            type="text"
                                            placeholder='Entrez le numéro de la recette à supprimer'
                                            name="recipeID"
                                            onChange={(event) =>
                                                setRecipeRemoveId(
                                                    event.target.value
                                                )
                                            }
                                        />
                                        <button
                                            className="delete_button"
                                            onClick={() =>
                                                handleRemoveRecipe(
                                                    parseInt(recipeRemoveId)
                                                )
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
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
