import { Button, Modal, Text } from '@nextui-org/react'

import { MdCloseFullscreen } from 'react-icons/md'
import RecipeDetails from './RecipeDetails'

const ModalRecipeDetail = ({ isOpen, onClose, recipe }) => {
    return (
        <Modal aria-labelledby="modal-title" open={isOpen} onClose={onClose}>
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    {recipe.user.username} présente la recette{' '}
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
        </Modal>
    )
}

export default ModalRecipeDetail