import { Button, Loading, Modal, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { MdCloseFullscreen } from 'react-icons/md'
import { Recipe } from '../../../../../../server/src/shared/types'
import RecipeDetails from '../../allRecipe/RecipeDetails'
import { getRecipesByID } from '../../../../router/recipesRouter'

interface ModalRecipeDetailProps {
    isOpen: boolean
    onClose: () => void
    recipeID: number
}

const ModalRecipeDetail = ({
    isOpen,
    onClose,
    recipeID,
}: ModalRecipeDetailProps) => {
    const [recipe, setRecipe] = useState<Recipe>({} as Recipe)
    useEffect(() => {
        if (recipeID !== undefined && recipeID !== 0 && recipeID !== null) {
            Promise.all([getRecipesByID(recipeID)]).then(([recipe]) => {
                setRecipe(recipe[0])
            })
        }
    }, [recipeID])
    return (
        <Modal
            aria-labelledby="modal-title"
            width="50%"
            open={isOpen}
            onClose={onClose}
            animated={false}
            preventClose
            blur
        >
            {recipe ? (
                <>
                    <Modal.Header>
                        <Text id="modal-title" h2>
                            {recipe.name}
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <RecipeDetails recipe={recipe} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            auto
                            flat
                            color={'error'}
                            icon={<MdCloseFullscreen />}
                            onPress={onClose}
                        />
                    </Modal.Footer>
                </>
            ) : (
                <Modal.Body>
                    <Loading type="points-opacity" size="xl" />
                </Modal.Body>
            )}
        </Modal>
    )
}

export default ModalRecipeDetail
