import { Button, Loading, Modal, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { MdCloseFullscreen } from 'react-icons/md'
import { Recipe } from '../../../../../server/src/shared/types'
import RecipeDetails from './RecipeDetails'
import { getRecipesByID } from '../../../router/recipesRouter'

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
                setRecipe(recipe)
            })
        }
    }, [recipe, recipeID])

    return (
        <Modal
            aria-labelledby="modal-title"
            width="50%"
            open={isOpen}
            onClose={onClose}
        >
            {recipe ? (
                <>
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            {recipe.creator_username} présente la recette{' '}
                            <Text b size={18}>
                                {recipe.name}
                            </Text>
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
                    <Loading color="currentColor" size="xl" />
                </Modal.Body>
            )}
        </Modal>
    )
}

export default ModalRecipeDetail
