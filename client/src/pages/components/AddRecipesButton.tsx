import '../../styles/AddRecipeButton.scss'

type Props = {
    addRecipes: boolean
    handleClose: () => void
    handleAdd: () => void
}

const AddRecipeButton = ({ addRecipes, handleClose, handleAdd }: Props) => {
    return (
        <>
            {addRecipes ? (
                <>
                    <button
                        className="button close_button"
                        onClick={handleClose}
                    >
                        Annuler
                    </button>
                </>
            ) : (
                <>
                    <button className="button add_button" onClick={handleAdd}>
                        Ajouter une recette
                    </button>
                </>
            )}
        </>
    )
}

export default AddRecipeButton
