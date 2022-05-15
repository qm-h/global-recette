import { useState } from 'react'

type Props = {
    errorMessage: string
    handleSave: (
        name: string,
        ingredientsName: string,
        origin: string,
        details: string
    ) => void
    counter: number
}

const AddRecipeComponent = ({ errorMessage, handleSave, counter }: Props) => {
    const [recipeName, setRecipeName] = useState('')
    const [recipeIngredient, setRecipeIngredient] = useState('')
    const [recipeDetails, setRecipeDetails] = useState('')
    const [recipeOrigin, setRecipeOrigin] = useState('')

    return (
        <div className="add_component_container">
            {errorMessage && <h3>{errorMessage}</h3>}
            <span>Nom</span>
            <input
                onChange={(event) => setRecipeName(event.target.value)}
                id="name"
                name="name"
                type="text"
                required
            />
            <label>Origine</label>
            <input
                id="origin"
                onChange={(event) => setRecipeDetails(event.target.value)}
                name="origin"
                type="text"
                required
            />
            <label>Ingredients</label>
            <input
                onChange={(event) => setRecipeIngredient(event.target.value)}
                type="text"
                name="ingredient"
                id="ingredient"
                required
            />
            {Array.from(Array(counter)).map((c, index) => {
                return (
                    <input
                        onChange={(event) =>
                            setRecipeDetails(event.target.value)
                        }
                        key={index}
                        type="text"
                        name="ingredient"
                        id="ingredient"
                    />
                )
            })}
            <label>Details</label>
            <input
                id="detail"
                onChange={(event) => setRecipeOrigin(event.target.value)}
                name="detail"
                type="text"
                required
            />
            <button
                type="submit"
                className="button save_button"
                onClick={() =>
                    handleSave(
                        recipeName,
                        recipeIngredient,
                        recipeOrigin,
                        recipeDetails
                    )
                }
            >
                Save
            </button>
        </div>
    )
}

export default AddRecipeComponent
