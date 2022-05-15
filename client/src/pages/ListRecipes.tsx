import { useEffect, useState } from 'react'
import { Recipes } from '../../../server/share/types'
import { addRecipe, getAllRecipes } from '../api/router'

const ListRecipes = () => {
    const [addRecipes, setAddRecipes] = useState(false)
    const [recipesData, setRecipesData] = useState<Recipes[]>([])
    const [recipeName, setRecipeName] = useState('')
    const [recipeDetails, setRecipeDetails] = useState('')

    const handleAdd = () => {
        setAddRecipes(true)
    }
    const handleClose = () => {
        setAddRecipes(false)
    }

    const handleSave = (name: string, details: string) => {
        const data: Recipes = {
            name: name,
            details: details,
            ingredients: ['tout', 'ou', 'rien'],
            origin: 'nulpart',
        }
        recipesData.push(data)
        setRecipesData([])
        setAddRecipes(false)
        addRecipe(data)
    }

    useEffect(() => {
        getAllRecipes.then((r) => setRecipesData(r))
        console.log(recipesData)
    }, [recipesData])

    const addComponent = (
        <div className="add_component_container">
            <span>Nom</span>
            <input
                onChange={(event) => setRecipeName(event.target.value)}
                id="name"
                name="name"
                type="text"
                value={recipeName}
            />
            <label>Details</label>
            <input
                id="detail"
                onChange={(event) => setRecipeDetails(event.target.value)}
                name="detail"
                type="text"
            />
            <button
                type="submit"
                className="button save_button"
                onClick={() => handleSave(recipeName, recipeDetails)}
            >
                Save
            </button>
        </div>
    )
    return (
        <>
            <div className="card_container">
                <div className="title_card">
                    <h1>Recettes</h1>
                </div>
                <div className="card">
                    {addRecipes ? (
                        <button
                            className="button close_button"
                            onClick={handleClose}
                        >
                            x
                        </button>
                    ) : (
                        <button
                            className="button add_button"
                            onClick={handleAdd}
                        >
                            +
                        </button>
                    )}
                    <ul>
                        {addRecipes && addComponent}
                        {recipesData
                            ? recipesData.map((r, index) => (
                                  <>
                                      <li key={index}>
                                          {r.name} : {r.details}
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
