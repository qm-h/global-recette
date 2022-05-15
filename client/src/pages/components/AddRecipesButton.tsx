type Props = {
    addRecipes: boolean
    handleClose: () => void
    addIngredient: JSX.Element
    handleAdd: () => void
}

const AddRecipeButton = ({
    addRecipes,
    handleClose,
    addIngredient,
    handleAdd,
}: Props) => {
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
