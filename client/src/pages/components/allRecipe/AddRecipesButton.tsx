import { Button } from '@nextui-org/react'

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
                    <Button
                        color="error"
                        className="button close_button"
                        onClick={handleClose}
                    >
                        Annuler
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        color="success"
                        className="button add_button"
                        onClick={handleAdd}
                    >
                        Ajouter une recette
                    </Button>
                </>
            )}
        </>
    )
}

export default AddRecipeButton
