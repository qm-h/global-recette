import { useState } from 'react'

type Props = {
    errorMessage: string
    handleSave: (name: string, origin: string, details: string) => void
    counter: number
}

const AddRecipeComponent = ({ errorMessage, handleSave, counter }: Props) => {
    const [recipeName, setRecipeName] = useState('')
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
            />
            <label>Origine</label>
            <input
                id="origin"
                onChange={(event) => setRecipeDetails(event.target.value)}
                name="origin"
                type="text"
            />
            <label>Details</label>
            <input
                id="detail"
                onChange={(event) => setRecipeOrigin(event.target.value)}
                name="detail"
                type="text"
            />
            <button
                type="submit"
                className="button save_button"
                onClick={() =>
                    handleSave(recipeName, recipeOrigin, recipeDetails)
                }
            >
                Save
            </button>
        </div>
    )
}

export default AddRecipeComponent
