type Props = {
    addRecipes: boolean
    handleClose: () => void
    handleAdd: () => void
    handleAddIngredient: () => void
}

const AddRecipeButton = ({
    addRecipes,
    handleClose,
    handleAdd,
    handleAddIngredient,
}: Props) => {
    const addIngredient = (
        <button className="button add_button" onClick={handleAddIngredient}>
            Ajouter un ingrédient
        </button>
    )

    return (
        <>
            {addRecipes ? (
                <>
                    <button
                        className="button close_button"
                        onClick={handleClose}
                    >
                        x
                    </button>
                    {addIngredient}
                </>
            ) : (
                <>
                    <button className="button add_button" onClick={handleAdd}>
                        +
                    </button>
                    {addIngredient}
                </>
            )}
        </>
    )
}

export default AddRecipeButton
